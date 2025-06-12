"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

type UploadFileResponse = {
    filename: string;
};

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return await requestApiWithAuthentication<UploadFileResponse>(
        "/files/upload",
        "POST",
        {
            body: formData,
        }
    );
};
