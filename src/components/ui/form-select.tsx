import { ReactNode, useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type FormSelectProps = {
    placeholder?: string;
    id?: string;
    name?: string;
    children?: ReactNode;
    errorMessage?: string;
    label?: string;
    value?: string;
    onValueChange?: (value: string) => void;
};

export const FormSelect = ({
    placeholder,
    id,
    name,
    children,
    errorMessage,
    label,
    value,
    onValueChange,
}: FormSelectProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>("");

    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} className={errorMessage && "text-red-500"}>
                {label}
            </Label>
            <Select
                value={value || data}
                onValueChange={
                    onValueChange ? onValueChange : (val) => setData(val)
                }
            >
                <SelectTrigger id={id} name={name}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>{children}</SelectContent>
            </Select>
            <span className="text-red-500 text-sm">{errorMessage}</span>
        </div>
    );
};
