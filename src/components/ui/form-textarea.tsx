import { ChangeEventHandler, useContext, useState } from "react";
import { Label } from "./label";
import { FormContext } from "./form";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";

type FormInputProps = {
    className?: string;
    placeholder?: string;
    name?: string;
    id?: string;
    value?: string;
    defaultValue?: string;
    children?: string;
    errorMessage?: string;
    errorFieldPath?: string;
    readOnly?: boolean;
    rows?: number;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export const FormTextarea = ({
    className,
    placeholder,
    name,
    id,
    value,
    defaultValue,
    children,
    errorMessage,
    errorFieldPath,
    readOnly: readonly,
    onChange,
    rows,
}: FormInputProps) => {
    const [data, setData] = useState<string | number>(defaultValue || "");
    const { errorFields } = useContext(FormContext);

    if (!errorMessage && errorFieldPath) {
        errorMessage = errorFields[errorFieldPath];
    }

    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} className={errorMessage && "text-red-500"}>
                {children}
            </Label>
            <Textarea
                name={name}
                id={id}
                value={value || data}
                onChange={
                    onChange
                        ? onChange
                        : (val) => setData(val.currentTarget.value)
                }
                placeholder={placeholder}
                className={cn(errorMessage && "border-red-500", className)}
                readOnly={readonly}
                rows={rows}
            ></Textarea>
            <span className="text-red-500 text-sm">{errorMessage}</span>
        </div>
    );
};
