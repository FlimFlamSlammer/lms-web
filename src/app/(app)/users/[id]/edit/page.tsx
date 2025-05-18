"use client";

import { getUser } from "@/actions/users/get-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { UpdateUserForm } from "@/components/users/form";
import { User } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateUserPage = () => {
    const { id }: { id: string } = useParams();
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        getUser(id).then((res) => {
            setUser(res.data);
        });
    }, [setUser, id]);

    return (
        <>
            <Header>Edit User</Header>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <UpdateUserForm user={user || undefined} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateUserPage;
