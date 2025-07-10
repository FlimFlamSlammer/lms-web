"use client";
import { useDataContext } from "@/components/providers/data-provider";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
} from "@/components/ui/combobox";
import { reloadPage } from "@/helpers/reload-page";
import { Course, Teacher } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTeachersNotInCourse } from "@/actions/courses/get-teachers-not-in-course";
import { addTeachersToCourse } from "@/actions/courses/manage-teachers";

export const CourseTeacherSelector = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const course = useDataContext() as Course | null;
    const [selectedTeachers, setSelectedTeachers] = useState(new Set<string>());

    useEffect(() => {
        if (!course) return;
        getTeachersNotInCourse(course.id).then((res) => {
            if (res.error) throw new Error(res.error);
            if (res.data) setTeachers(res.data);
        });
    }, [course]);

    return (
        <div className="flex gap-2">
            <Combobox
                multipleSelections
                selectedValues={selectedTeachers}
                onSelectedValuesChange={(selected) => {
                    setSelectedTeachers(selected);
                }}
            >
                <ComboboxTrigger asChild>
                    <Button variant="outline">+ Select Teachers</Button>
                </ComboboxTrigger>
                <ComboboxList emptyMessage="No teachers found.">
                    {teachers.map((teacher) => {
                        return (
                            <ComboboxItem key={teacher.id} value={teacher.id}>
                                <div className="flex justify-between text-nowrap w-full min-w-80">
                                    <span>{teacher.user?.name}</span>
                                    <span className="text-muted-foreground">
                                        {teacher.user?.email}
                                    </span>
                                </div>
                            </ComboboxItem>
                        );
                    })}
                </ComboboxList>
            </Combobox>
            <Button
                onClick={() => {
                    if (!course) throw new Error("Course to edit not found!");
                    addTeachersToCourse(
                        course.id,
                        Array.from(selectedTeachers)
                    ).then(() => {
                        router.refresh();
                    });
                    setSelectedTeachers(new Set());
                }}
                disabled={selectedTeachers.size == 0}
            >
                Add
            </Button>
        </div>
    );
};
