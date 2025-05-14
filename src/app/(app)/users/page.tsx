import { getUsers } from "@/actions/users/get-users";
import { Button } from "@/components/ui/button";
import {
    FormFilter,
    FormFilterField as FormFilterField,
} from "@/components/ui/form-filter";
import { Header } from "@/components/ui/header";
import { UserDataTable } from "@/components/users/data-table";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        status?: "all" | "active" | "inactive";
        page?: string;
        search?: string;
    }>;
};

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const UsersPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const {
        data: { users, total },
        error,
    } = await getUsers({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    return (
        <>
            <Header>Users</Header>
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <Button asChild>
                    <Link href="/users/create">Add User</Link>
                </Button>
            </div>
            <UserDataTable
                data={users}
                rowCount={total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default UsersPage;
