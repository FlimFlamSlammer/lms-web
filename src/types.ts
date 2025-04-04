export type UserRole = "superadmin" | "teacher" | "student" | "admin";

export type User = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    status: "active" | "inactive";
    role: UserRole;
    profileImage: string | null;
};

export type APIResponse = {
    error: string | null;
    errorFields: Record<string, string> | null;
    data: any;
};
