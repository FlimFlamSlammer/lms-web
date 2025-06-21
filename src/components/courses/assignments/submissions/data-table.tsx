"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Submission } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DownloadLink } from "@/components/ui/download-link";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { useState } from "react";
import { FormButton } from "@/components/ui/form-button";
import { gradeAssignment } from "@/actions/courses/assignments/grade-assignment";

const columns: ColumnDef<Submission>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const submission = row.original;
            return submission.student?.user?.name;
        },
    },
    {
        header: "Grade",
        accessorKey: "grade",
    },
    {
        header: "File",
        cell: ({ row }) => {
            const submission = row.original;
            return (
                <DownloadLink href={`/api/file/${submission.attachmentPath}`}>
                    Download
                </DownloadLink>
            );
        },
    },
];

interface Props {
    data: Submission[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function SubmissionDataTable(props: Props) {
    const { id, assignmentId } = useParams() as {
        id: string;
        assignmentId: string;
    };
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [gradedSubmission, setGradedSubmission] = useState<Submission>();

    const usedColumns = [...columns];

    const renderRowActions = (submission: Submission) => {
        return (
            <ActionsDropdown>
                {user?.role === "teacher" && (
                    <DropdownMenuItem
                        onSelect={() => {
                            setDialogOpen(true);
                            setGradedSubmission(submission);
                        }}
                    >
                        Grade
                    </DropdownMenuItem>
                )}
            </ActionsDropdown>
        );
    };

    return (
        <>
            <DataTable<Submission>
                {...props}
                columns={usedColumns}
                renderRowActions={renderRowActions}
            />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Grade Assignment</DialogTitle>
                        <DialogDescription>
                            Enter grade for{" "}
                            {gradedSubmission?.student?.user?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <Form
                        action={async (formData: FormData) => {
                            console.log(formData.get("grade") as string);

                            return await gradeAssignment(
                                id,
                                assignmentId,
                                gradedSubmission?.studentId || "",
                                formData.get("grade") as string
                            );
                        }}
                        redirectURL={
                            pathname + new URLSearchParams(searchParams)
                        }
                        onSuccess={() => setDialogOpen(false)}
                    >
                        <FormInput
                            type="number"
                            name="grade"
                            errorFieldPath="grade"
                        >
                            Grade
                        </FormInput>
                        <DialogFooter>
                            <FormButton>Submit</FormButton>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
