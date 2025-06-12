"use client";

import { uploadFile } from "@/actions/upload-file";

export const uploadFileWithAlert = async (file: File) => {
    if (file.size === 0) return undefined;
    const res = await uploadFile(file);
    if (res.error) {
        alert(res.error);
    }

    return res.data?.filename;
};
