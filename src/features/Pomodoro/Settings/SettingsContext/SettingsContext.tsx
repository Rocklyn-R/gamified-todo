import React from "react";

interface SettingsContextType {
    workMinutes: number;
    breakMinutes: number;
    setWorkMinutes: React.Dispatch<React.SetStateAction<number>>;
    setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsContext = React.createContext<SettingsContextType>({
    workMinutes: 0,
    breakMinutes: 0,
    setWorkMinutes: () => {},
    setBreakMinutes: () => {},
});