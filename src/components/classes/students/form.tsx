"use client";

import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FormButton } from "@/components/ui/form-button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { getStudents } from "@/actions/users/get-users";
import { User } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { addStudents } from "@/actions/classes/add-students";
import { useParams } from "next/navigation";

export const AddStudentsToClassForm = () => {
    const [students, setStudents] = useState<User[]>([]);
    const [studentsToAdd, setStudentsToAdd] = useState<Set<User>>(new Set([]));
    const [open, setOpen] = useState<boolean>(false);
    const { id } = useParams();

    const action = () => {
        return addStudents(
            id as string,
            Array.from(studentsToAdd.values()).map((student) => {
                return student.id;
            })
        );
    };

    useEffect(() => {
        getStudents({
            mode: "all",
        }).then((res) => {
            console.log(res);
            setStudents(res.data.users);
        });
    }, []);

    return (
        <Form action={action} redirectURL={`/classes/${id}/people`}>
            {Array.from(studentsToAdd.values()).map((student) => {
                return (
                    <div key={student.email}>
                        <div className="flex items-center justify-between gap-4 text-nowrap w-full min-w-80">
                            <span>{student.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="material-symbols-outlined text-xl"
                                onClick={() => {
                                    setStudentsToAdd(
                                        studentsToAdd.difference(
                                            new Set([student])
                                        )
                                    );
                                }}
                            >
                                close
                            </Button>
                        </div>
                        <Separator className="mt-2" />
                    </div>
                );
            })}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <FormButton variant="outline" className="mx-auto">
                        + Add student
                    </FormButton>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                    <Command>
                        <CommandInput placeholder="Search student..." />
                        <CommandList>
                            <CommandEmpty>No student found.</CommandEmpty>
                            <CommandGroup>
                                {students?.map((student) => {
                                    return (
                                        <CommandItem
                                            key={student.email}
                                            value={student.name}
                                            onSelect={() => {
                                                setStudentsToAdd(
                                                    studentsToAdd.union(
                                                        new Set([student])
                                                    )
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            <div className="flex justify-between gap-4 text-nowrap w-full min-w-80">
                                                <span>{student.name}</span>
                                                <span className="text-muted-foreground">
                                                    {student.email}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <FormButton className="ml-auto">Submit</FormButton>
        </Form>
    );
};
