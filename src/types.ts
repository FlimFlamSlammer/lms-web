export type User = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    status: "active" | "inactive";
    role: "superadmin" | "teacher" | "student" | "admin";
    profileImage: string | null;
};

export type APIResponse = {
    error: string | null;
    errorFields: Record<string, string> | null;
    data: any;
};
