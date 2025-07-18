"use client";

import { getClass } from "@/actions/classes/get-class";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UpdateClassForm } from "@/components/classes/form";
import { Class } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditClassPage = () => {
    const { id }: { id: string } = useParams();
    const [classData, setClassData] = useState<Class | null>();

    useEffect(() => {
        getClass(id).then((res) => {
            setClassData(res.data);
        });
    }, [setClassData, id]);

    return (
        <div className="flex justify-center w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Class</CardTitle>
                    <CardDescription>
                        Update this class&apos;s data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateClassForm $class={classData || undefined} />
                </CardContent>
            </Card>
        </div>
    );
};

export default EditClassPage;
