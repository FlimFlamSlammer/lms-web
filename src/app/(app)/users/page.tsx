import { getUsers } from "@/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { FormFilter, FormFilterSelect } from "@/components/ui/form-filter";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserDataTable } from "@/components/users/data-table";
import { SearchParams, UserRole } from "@/types";
import Link from "next/link";

type Props = {
    searchParams: Promise<
        SearchParams & {
            role?: UserRole | "all";
        }
    >;
};

const UsersPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const { data, error } = await getUsers({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
        role: (await searchParams).role,
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return (
        <>
            <Header>Users</Header>
            <div className="flex items-center justify-between mb-4">
                <FormFilter>
                    <Input
                        name="search"
                        placeholder="Search"
                        defaultValue={(await searchParams).search}
                    />
                    <FormFilterSelect name="role">
                        <SelectTrigger>
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="superadmin">
                                Super Admin
                            </SelectItem>{" "}
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </FormFilterSelect>
                    <FormFilterSelect name="status">
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </FormFilterSelect>
                </FormFilter>
                <Button asChild>
                    <Link href="/users/create">Add User</Link>
                </Button>
            </div>
            <UserDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default UsersPage;
