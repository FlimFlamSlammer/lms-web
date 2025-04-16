import { listAccounts } from "@/actions/users/list-users";
import { UserDataTable } from "@/components/users/data-table";
import { UserFormFilter } from "@/components/users/form-filter";

type Props = {
    searchParams: Promise<{
        status?: string;
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
        status: "all",
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex items-center py-4">
                <UserFormFilter />
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
