import React from 'react';

interface IconContainerProps {
    children: React.ReactNode;
    size?: number;
    bgColor?: string;
}

const IconContainer: React.FC<IconContainerProps> = ({ children, size = 44, bgColor = 'bg-primary-400' }) => {
    return (
        <section
            className={`flex items-center justify-center rounded-full cursor-pointer ${bgColor} shadow `}
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            {children}
        </section>
    );
};

export default IconContainer;
