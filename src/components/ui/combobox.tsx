"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import {
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    Command,
    CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ButtonProps } from "./button";
import { Checkbox } from "./checkbox";

export type ComboboxProps = {
    children?: ReactNode;
    multipleSelections: boolean;
};

type ComboboxContextValue = {
    multipleSelections?: boolean;
    setOpen: (val: boolean) => void;
};

const ComboboxContext = createContext<ComboboxContextValue>(
    {} as ComboboxContextValue
);

export const Combobox = ({ children, multipleSelections }: ComboboxProps) => {
    const [open, setOpen] = useState(false);

    return (
        <ComboboxContext.Provider value={{ multipleSelections, setOpen }}>
            <Popover open={open} onOpenChange={setOpen}>
                {children}
            </Popover>
        </ComboboxContext.Provider>
    );
};

export type ComboboxTriggerProps = ButtonProps;

export const ComboboxTrigger = ({ ...buttonProps }: ComboboxTriggerProps) => {
    return <PopoverTrigger {...buttonProps} />;
};

export type ComboboxListProps = {
    emptyMessage: string;
    children?: ReactNode;
};

export const ComboboxList = ({ emptyMessage, children }: ComboboxListProps) => {
    return (
        <PopoverContent className="w-fit p-2">
            <Command>
                <CommandInput placeholder="Search student..." />
                <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>{children}</CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    );
};

export type ComboboxItemProps = {
    children?: ReactNode;
    className?: string;
    value: string;
    selected?: boolean;
    onSelect?: () => void;
};

export const ComboboxItem = ({
    children,
    className,
    value,
    selected,
    onSelect,
}: ComboboxItemProps) => {
    const { multipleSelections, setOpen } = useContext(ComboboxContext);
    return (
        <CommandItem
            className={className}
            value={value}
            onSelect={() => {
                if (!multipleSelections) {
                    setOpen(false);
                }
                if (onSelect) onSelect();
            }}
        >
            {multipleSelections ? <Checkbox checked={selected} /> : undefined}
            {children}
        </CommandItem>
    );
};
