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
import { Class, Course } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addClassesToCourse } from "@/actions/courses/manage-classes";
import { getClassesNotInCourse } from "@/actions/courses/get-classes-not-in-course";

export const CourseClassSelector = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [classes, setClasses] = useState<Class[]>([]);
    const course = useDataContext() as Course | null;
    const [selectedClasses, setSelectedClasses] = useState(new Set<string>());

    useEffect(() => {
        if (!course) return;
        getClassesNotInCourse(course.id).then((res) => {
            if (res.data) setClasses(res.data);
        });
    }, [course]);

    return (
        <div className="flex gap-2">
            <Combobox
                multipleSelections
                selectedValues={selectedClasses}
                onSelectedValuesChange={(selected) => {
                    setSelectedClasses(selected);
                }}
            >
                <ComboboxTrigger asChild>
                    <Button variant="outline">+ Select Classes</Button>
                </ComboboxTrigger>
                <ComboboxList emptyMessage="No classes found.">
                    {classes.map(($class) => {
                        return (
                            <ComboboxItem key={$class.id} value={$class.id}>
                                <div className="text-nowrap w-full min-w-80">
                                    <span>{$class.name}</span>
                                </div>
                            </ComboboxItem>
                        );
                    })}
                </ComboboxList>
            </Combobox>
            <Button
                onClick={() => {
                    if (!course) throw new Error("Course to edit not found!");
                    addClassesToCourse(
                        course.id,
                        Array.from(selectedClasses)
                    ).then(() => {
                        reloadPage(router, pathname, searchParams);
                    });
                    setSelectedClasses(new Set());
                }}
                disabled={selectedClasses.size == 0}
            >
                Add
            </Button>
        </div>
    );
};
