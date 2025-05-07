import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { CreateUserForm } from "@/components/users/form";

const CreateUserPage = () => {
    return (
        <>
            <Header>Create User</Header>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <CreateUserForm />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateUserPage;
