import { ReactNode } from 'react';

const ReusableComponent = ({
    icons,
    name,
    title,
    btnColor
}: {
    name: string;
    icons: ReactNode;
    title?: string;
    btnColor?: string;
}) => {
    return (
        <a
            href=""
            style={{ backgroundColor: btnColor }}
            className="flex  px-2 rounded-md shadow-sm border py-2 gap-2 items-center"
        >
            <div className="text-[#0D2C7A]"> {icons}</div>
            <section>
                <p className="text-[8px] text-[#898384] font-medium">{title}</p>
                <p className="text-[10px] font-medium">{name}</p>
            </section>{' '}
        </a>
    );
};

export default ReusableComponent;
