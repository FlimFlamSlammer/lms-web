"use client";
import { addStudentsToClass } from "@/actions/classes/manage-students";
import { getStudentsNotInClass } from "@/actions/classes/get-students-not-in-class";
import { useDataContext } from "@/components/providers/data-provider";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
} from "@/components/ui/combobox";
import { reloadPage } from "@/helpers/reload-page";
import { Class, Student } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const StudentSelector = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [students, setStudents] = useState<Student[]>([]);
    const $class = useDataContext() as Class | null;
    const [selectedStudents, setSelectedStudents] = useState(new Set<string>());

    useEffect(() => {
        if (!$class) return;
        getStudentsNotInClass($class.id).then((res) => {
            if (res.data) setStudents(res.data);
        });
    }, [$class]);

    return (
        <div className="flex gap-2">
            <Combobox
                multipleSelections
                selectedValues={selectedStudents}
                onSelectedValuesChange={(selected) => {
                    setSelectedStudents(selected);
                }}
            >
                <ComboboxTrigger asChild>
                    <Button variant="outline">+ Select Students</Button>
                </ComboboxTrigger>
                <ComboboxList emptyMessage="No students found.">
                    {students.map((student) => {
                        return (
                            <ComboboxItem key={student.id} value={student.id}>
                                <div className="flex justify-between gap-4 text-nowrap w-full min-w-80">
                                    <span>{student.user?.name}</span>
                                    <span className="text-muted-foreground">
                                        {student.user?.email}
                                    </span>
                                </div>
                            </ComboboxItem>
                        );
                    })}
                </ComboboxList>
            </Combobox>
            <Button
                onClick={() => {
                    if (!$class) throw new Error("Class to edit not found!");
                    addStudentsToClass(
                        $class.id,
                        Array.from(selectedStudents)
                    ).then(() => {
                        reloadPage(router, pathname, searchParams);
                    });
                    setSelectedStudents(new Set());
                }}
                disabled={selectedStudents.size == 0}
            >
                Add
            </Button>
        </div>
    );
};
