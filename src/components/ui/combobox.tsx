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
    defaultSelectedValues?: Set<string>;
    onSelectedValuesChange?: (selected: Set<string>) => void;
    selectedValues?: Set<string>;
};

type ComboboxContextValue = {
    multipleSelections?: boolean;
    setOpen: (val: boolean) => void;
    selected: Set<string>;
    setSelected: (v: Set<string>) => void;
};

const ComboboxContext = createContext<ComboboxContextValue>(
    {} as ComboboxContextValue
);

export const Combobox = ({
    children,
    multipleSelections,
    defaultSelectedValues,
    onSelectedValuesChange,
    selectedValues,
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(
        defaultSelectedValues || new Set<string>()
    );

    const handleSelectedChange = (v: Set<string>) => {
        setSelected(v);
        if (onSelectedValuesChange) onSelectedValuesChange(v);
    };

    return (
        <ComboboxContext.Provider
            value={{
                multipleSelections,
                setOpen,
                selected: selectedValues || selected,
                setSelected: handleSelectedChange,
            }}
        >
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
        <PopoverContent className="w-fit p-1">
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
    onSelect?: () => void;
};

export const ComboboxItem = ({
    children,
    className,
    value,
    onSelect,
}: ComboboxItemProps) => {
    const { multipleSelections, setOpen, selected, setSelected } =
        useContext(ComboboxContext);
    return (
        <CommandItem
            className={className}
            value={value}
            onSelect={() => {
                if (!multipleSelections) {
                    setOpen(false);
                }
                if (onSelect) onSelect();

                if (selected.has(value)) {
                    setSelected(selected.difference(new Set<string>([value])));
                } else {
                    setSelected(selected.union(new Set<string>([value])));
                }
            }}
        >
            {multipleSelections ? (
                <Checkbox checked={selected.has(value)} />
            ) : undefined}
            {children}
        </CommandItem>
    );
};
