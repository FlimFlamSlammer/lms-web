"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Submission } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/components/providers/data-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DownloadLink } from "@/components/ui/download-link";

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
    const { id, assignmentId } = useDataContext() as {
        id: string;
        assignmentId: string;
    };
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const usedColumns = [...columns];

    const renderRowActions = (submission: Submission) => {
        return (
            <ActionsDropdown>
                {user?.role === "teacher" && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>Grade</DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Submission>
            {...props}
            columns={usedColumns}
            renderRowActions={renderRowActions}
        />
    );
}
