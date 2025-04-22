import { listAccounts } from "@/actions/users/list-users";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserDataTable } from "@/components/users/data-table";
import { UserFormFilter } from "@/components/users/form-filter";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        status?: "all" | "active" | "inactive";
        page?: string;
        search?: string;
    }>;
};

const UsersPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const {
        data: { users, total },
        error,
    } = await listAccounts({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    return (
        <div className="flex flex-col w-full h-full p-4">
            <h1 className="text-4xl font-light">Users</h1>
            <Separator className="my-2"></Separator>
            <div className="flex items-center justify-between my-4">
                <UserFormFilter />
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
        </div>
    );
};

export default UsersPage;
