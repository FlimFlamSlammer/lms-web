import { requestApiWithAuthentication } from "@/helpers/fetch";
import {
    AssignmentListQueryParams,
    GetAssignmentsResponseData,
} from "../courses/assignments/get-assignments";

export const getTodoAssignments = async ({
    page,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
    active = "true",
    done = "false",
    started = "all",
}: AssignmentListQueryParams) => {
    return await requestApiWithAuthentication<GetAssignmentsResponseData>(
        "/assignments",
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
                status,
                active,
                done,
                started,
            },
        }
    );
};
