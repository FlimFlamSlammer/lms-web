"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

type UploadFileResponse = {
    filename: string;
};

export const uploadFile = async (file: File, silentErrors: boolean = false) => {
    if (file.size === 0) return undefined;

    const formData = new FormData();
    formData.append("file", file);

    const res = await requestApiWithAuthentication<UploadFileResponse>(
        "/files/upload",
        "POST",
        {
            body: formData,
        }
    );

    if (!silentErrors && res.error) {
        alert(res.error);
    }

    return res.data?.filename;
};
