export type UserRole = "superadmin" | "teacher" | "student" | "admin";
export type Status = "active" | "inactive";

export type User = {
    name: string;
    id: string;
    email: string;
    phoneNumber?: string;
    status: Status;
    password: string;
    needsPasswordChange: boolean;
    role: UserRole;
    profileImage?: string;
    roleData?: Student | Teacher;
};

export type Student = {
    id: string;
    birthDate: string;
    nis: string;
    description?: string;
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    contactPhoneNumber: string;
    user?: User;
};

export type Teacher = {
    id: string;
    nig: string;
    expertise?: string;
    bachelorDegree?: string;
    masterDegree?: string;
    doctorateDegree?: string;
    description?: string;
    user?: User;
};

export type Course = {
    id: string;
    name: string;
    grade: number;
    startYear: number;
    endYear: number;
    status: Status;
    classes?: Class[];
    teachers?: Teacher[];
};

export type Class = {
    id: string;
    name: string;
    status: Status;
    students?: Student[];
};

export type AssignmentStatus = "draft" | "posted" | "canceled";

export type Assignment = {
    id: string;
    title: string;
    teacherId: string;
    courseId: string;
    description?: string;
    status: AssignmentStatus;
    startTime: string;
    endTime: string;
    maxGrade: number;
    submissions?: Submission[];
};

export type Submission = {
    studentId: string;
    assignmentId: string;
    grade?: number;
    attachmentPath: string;
};

export type APIResponse<T = never> = {
    error: string | null;
    errorFields: Record<string, string> | null;
    data: T | null;
};

export type ListQueryParams = {
    page?: number;
    size?: number;
    mode?: "all" | "pagination";
    search?: string;
    status?: "all" | "active" | "inactive";
};

export type SearchParams = {
    status?: "all" | "active" | "inactive";
    page?: string;
    search?: string;
};
