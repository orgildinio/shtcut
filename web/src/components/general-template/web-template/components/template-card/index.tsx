import { Card } from '@shtcut-ui/react';
import { ImageDown, Link } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const TemplateCard = ({ color, image, label }: { color: string; label: string; image: string }) => {
    return (
        <Card className="w-full flex items-center gap-4 h-12 px-4 shadow-sm" style={{ backgroundColor: color }}>
            {image ? (
                <Image src={image ?? ''} alt={label} width={24} height={24} className="rounded-md" />
            ) : (
                <Link size={15} />
            )}
            <p className="text-sm ">{label}</p>
        </Card>
    );
};

export default TemplateCard;
