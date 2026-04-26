import React from "react";

interface IconWrapperProps {
    icon: React.ElementType;
    size?: 'sm' | 'lg';
    className?: string;
}

export const IconWrapper = ({
    icon: Icon,
    size = 'sm',
    className = ""
}: IconWrapperProps) => {

    // Container sizes
    const containerSizes = {
        sm: "w-8 h-8 rounded-lg", // Sidebar / Small list size
        lg: "w-12 h-12 rounded-xl", // Main Bot / Large size
    };

    // Icon sizes (the actual SVG inside)
    const iconSizes = {
        sm: "w-4 h-4",
        lg: "w-6 h-6",
    };

    const baseStyles = "bg-(--accent) text-white flex items-center justify-center shadow-sm shrink-0";

    const combinedClasses = `${containerSizes[size]} ${baseStyles} ${className}`.trim();

    return (
        <div className={combinedClasses}>
            <Icon
                className={iconSizes[size]}
                strokeWidth={2.5}
            />
        </div>
    );
};