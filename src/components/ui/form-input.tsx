import {
    ChangeEventHandler,
    HTMLInputTypeAttribute,
    useContext,
    useState,
} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormContext } from "./form";

type FormInputProps = {
    placeholder?: string;
    name?: string;
    id?: string;
    type?: HTMLInputTypeAttribute;
    value?: string;
    defaultValue?: string;
    children?: string;
    errorMessage?: string;
    errorFieldPath?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const FormInput = ({
    placeholder,
    name,
    id,
    type,
    value,
    defaultValue,
    children,
    errorMessage,
    errorFieldPath,
    onChange,
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
            <Input
                name={name}
                id={id}
                type={type}
                value={value || data}
                onChange={
                    onChange
                        ? onChange
                        : (val) => setData(val.currentTarget.value)
                }
                placeholder={placeholder}
                className={errorMessage && "border-red-500"}
            ></Input>
            <span className="text-red-500 text-sm">{errorMessage}</span>
        </div>
    );
};
