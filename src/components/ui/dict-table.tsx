import { Table, TableBody, TableRow, TableCell } from "./table";

export type DictTableRow = {
    key: string;
    value?: string;
};

export const DictTable = ({ rows }: { rows: DictTableRow[] }) => {
    return (
        <Table>
            <TableBody>
                {rows.map((row) => {
                    return (
                        <TableRow key={row.key}>
                            <TableCell className="font-bold">
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
