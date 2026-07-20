import type { ChangeEvent } from "react";

export interface TextInputProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    error?: string;
    readOnly?: boolean; 
    required?: boolean;
    tabIndex?: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}