"use client";

import { getUser } from "@/actions/users/get-user";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UpdateUserForm } from "@/components/users/form";
import { User } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditUserPage = () => {
    const { id }: { id: string } = useParams();
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        getUser(id).then((res) => {
            setUser(res.data);
        });
    }, [setUser, id]);

    return (
        <div className="flex justify-center w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                    <CardDescription>
                        Update this user&apos;s data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateUserForm user={user || undefined} />
                </CardContent>
            </Card>
        </div>
    );
};

export default EditUserPage;
