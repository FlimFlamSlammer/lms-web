import { listAccounts } from "@/actions/users/list-users";

type Props = {
    searchParams: Promise<{
        status?: string;
        page?: string;
    }>;
};

const AccountsPage = async (props: Props) => {
    const searchParams = await props.searchParams;
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
