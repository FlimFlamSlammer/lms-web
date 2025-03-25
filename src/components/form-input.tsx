import { HTMLInputTypeAttribute, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputProps = {
    placeholder?: string;
    name?: string;
    id?: string;
    type?: HTMLInputTypeAttribute;
    value?: string;
    children?: string;
    errorMessage?: string;
};

export const FormInput = ({
    placeholder,
    name,
    id,
    type,
    value,
    children,
    errorMessage,
}: FormInputProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>("");

    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} className={errorMessage && "text-red-500"}>
                {children}
            </Label>
            <Input
                name={name}
                id={id}
                type={type}
                value={value || data}
                onChange={!value ? (e) => setData(e.target.value) : undefined}
                placeholder={placeholder}
                className={errorMessage && "border-red-500"}
            ></Input>
            <span className="text-red-500 text-sm">{errorMessage}</span>
        </div>
    );
};
