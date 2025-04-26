import { ReactNode, useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormContext } from "./form";

type FormSelectProps = {
    placeholder?: string;
    id?: string;
    name?: string;
    children?: ReactNode;
    errorMessage?: string;
    errorFieldPath?: string;
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
    errorFieldPath,
    label,
    value,
    onValueChange,
}: FormSelectProps) => {
    const [data, setData] = useState<string>("");
    const { errorFields } = useContext(FormContext);

    if (!errorMessage && errorFieldPath) {
        errorMessage = errorFields[errorFieldPath];
    }

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
                <SelectTrigger id={id}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>{children}</SelectContent>
            </Select>
            <input
                className="hidden"
                name={name}
                id={id}
                value={value || data}
                readOnly
            />
            <span className="text-red-500 text-sm">{errorMessage}</span>
        </div>
    );
};
