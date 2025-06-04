import clsx from "clsx";


export const buttonStyles = {
    primary: clsx(
        "bg-blue-600",
        "hover:bg-blue-800",
        "text-white",
        "py-2",
        "px-4",
        "rounded",
        "transition-all"
    ),
    secondary: clsx(
        "bg-gray-200",
        "hover:bg-gray-300",
        "text-black",
        "py-2",
        "px-4",
        "rounded",
        "transition-all"
    ),
    disabled: clsx(
        "bg-gray-600",
        // "hover:bg-gray-800",
        "text-white",
        "py-2",
        "px-4",
        "rounded",
        "transition-all",
        "cursor-not-allowed",
    ),
    danger: clsx(
        "bg-red-600",
        "hover:bg-red-800",
        "text-white",
        "py-2",
        "px-4",
        "transition-all"
    ),
    outlineDanger: clsx(
        "border",
        "border-red-600",
        "text-red-600",
        "hover:bg-red-600",
        "hover:text-white",
        "py-2",
        "px-4",
        "rounded",
        "transition-all"
    ),
};