import { getLoginCookie } from "@/helpers/auth/cookie";
import { NextRequest } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { filename: string } }
) => {
    const filename = (await params).filename;
    const fileURL = `${process.env.BASE_URL}/files/${filename}`;

    const token = await getLoginCookie();

    const res = await fetch(fileURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token?.value}`,
        },
    });

    if (!res.ok)
        return new Response("Failed to fetch file from server!", {
            status: res.status,
        });

    const buffer = await res.arrayBuffer();
    const contentType =
        res.headers.get("Content-Type") || "application/octet-stream";

    console.log(contentType);

    return new Response(buffer, {
        headers: {
            "Content-Type": contentType,
        },
    });
};
