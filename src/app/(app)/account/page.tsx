import { listAccounts } from "@/actions/accounts/list-accounts";

type Props = {
    searchParams: {
        status?: string;
        page?: string;
    };
};

const AccountsPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt(searchParams.page || "1"), 1);

    const {
        data: { users, total },
    } = await listAccounts({
        page,
        status: "all",
    });

    console.log(users);
    console.log(total);

    return <div></div>;
};

export default AccountsPage;
