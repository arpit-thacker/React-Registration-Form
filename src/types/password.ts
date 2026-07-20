import type { ChangeEvent } from "react";

export interface PasswordInputProps {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    error?: string;
    required?: boolean;
    strength?: string;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}