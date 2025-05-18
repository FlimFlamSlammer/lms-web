"use client";
import { createContext, ReactNode, useContext } from "react";

const DataContext = createContext<unknown>(null);

type Props = {
    value: unknown;
    children: ReactNode;
};

export const DataProvider = ({ value, children }: Props) => {
    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
