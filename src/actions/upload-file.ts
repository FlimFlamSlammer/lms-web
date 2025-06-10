"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export type UploadFileResponse = {
    filename: string;
};

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return await requestApiWithAuthentication<UploadFileResponse>(
        "/files/upload",
        "POST",
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        }
    );
};
