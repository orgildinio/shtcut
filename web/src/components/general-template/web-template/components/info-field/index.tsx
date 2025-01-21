import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface InfoFieldProps {
    icon?: React.ReactNode;
    label: string;
    value: string | undefined;
    hasDivider?: boolean;
    color?: string | undefined;
}

const InfoField = ({ hasDivider = true, icon = <FaMapMarkerAlt />, label, value, color }: InfoFieldProps) => {
    const getHref = () => {
        if (!value) return '#';

        if (label.toLowerCase() === 'email') {
            return `mailto:${value}`;
        } else if (label.toLowerCase() === 'mobile' || label.toLowerCase() === 'phone') {
            return `tel:${value}`;
        } else if (label.toLowerCase() === 'website') {
            return value.startsWith('http') ? value : `https://${value}`;
        }
        return null;
    };

    const href = getHref();
    const shouldOpenInNewTab = href && (label.toLowerCase() === 'website' || label.toLowerCase() === 'email');

    const Content = (
        <div className="flex items-center">
            <div className="text-primary mr-2 text-xs" style={{ color: color }}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-[#9F9C9C]">{label}</p>
                <p className="text-xs font-semibold">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div>
            {href ? (
                <a
                    href={href}
                    target={shouldOpenInNewTab ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="no-underline"
                >
                    {Content}
                </a>
            ) : (
                Content
            )}
            {hasDivider && <hr className="border-t border-gray-300 mt-3" />}
        </div>
    );
};

export default InfoField;
