"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Select } from "./select";

type FormFilterContextData = {
    registerInputClearAction: (clearAction: () => void) => void;
};

const FormFilterContext = createContext<FormFilterContextData>(
    {} as FormFilterContextData
);

export const FormFilter = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);
    const clearActions: (() => void)[] = [];

    return (
        <form
            className="flex items-center gap-x-2"
            action={async (formData) => {
                const params = new URLSearchParams(searchParams);
                for (const pair of formData.entries()) {
                    if (pair[1]) {
                        params.set(pair[0], pair[1].toString());
                    } else {
                        params.delete(pair[0]);
                    }
                }

                router.replace(`${pathname}?${params.toString()}`);
            }}
            ref={formRef}
        >
            <FormFilterContext.Provider
                value={{
                    registerInputClearAction: (clearAction) => {
                        clearActions.push(clearAction);
                    },
                }}
            >
                {children}
            </FormFilterContext.Provider>

            <Button variant="outline">Search</Button>
            <Button
                variant="outline"
                onClick={() => {
                    if (formRef?.current) {
                        formRef.current.reset();
                    }

                    clearActions.forEach((clearAction) => {
                        clearAction();
                    });
                }}
            >
                Clear Filters
            </Button>
        </form>
    );
};

export type FormFilterSelectProps = {
    children: ReactNode;
    name: string;
};

export const FormFilterSelect = ({ children, name }: FormFilterSelectProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [visibleValue, setVisibleValue] = useState<string>("");
    const { registerInputClearAction } = useContext(FormFilterContext);

    useEffect(() => {
        registerInputClearAction(() => {
            setVisibleValue("");
        });
    }, [registerInputClearAction]);

    return (
        <>
            <Select
                onValueChange={(newValue) => {
                    if (inputRef.current) inputRef.current.value = newValue;
                    setVisibleValue(newValue);
                }}
                value={visibleValue}
            >
                {children}
            </Select>
            <input name={name} readOnly className="hidden" ref={inputRef} />
        </>
    );
};

export const FormFilterInput = {};
