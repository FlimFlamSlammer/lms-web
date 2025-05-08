import { Table, TableBody, TableRow, TableCell } from "./table";

export type DictTableRow = {
    key: string;
    value?: string;
};

type Props = {
    rows: DictTableRow[];
    className?: string;
};

export const DictTable = ({ rows, className }: Props) => {
    return (
        <Table className={className}>
            <TableBody>
                {rows.map((row) => {
                    return (
                        <TableRow key={row.key}>
                            <TableCell className="text-muted-foreground">
                                {row.key}
                            </TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
