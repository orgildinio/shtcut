/** @format */

import Image from 'next/image';
import { motion } from 'framer-motion';

interface OverlappingImagesProps {
    images: string[];
    size?: number;
    overlap?: number;
    borderColor?: string;
    animationDelay?: number;
}

const OverlappingImages: React.FC<OverlappingImagesProps> = ({
    images,
    size = 64,
    overlap = 16,
    borderColor = '#101C42',
    animationDelay = 0.2
}) => {
    return (
        <div className="flex items-center">
            {images.map((src, index) => (
                <motion.div
                    key={index}
                    className="relative"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        marginLeft: index !== 0 ? `-${overlap}px` : '0px'
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * animationDelay, duration: 0.5 }}
                >
                    <Image
                        src={src}
                        alt={`Person ${index + 1}`}
                        width={size}
                        height={size}
                        className="rounded-full transition-transform transform hover:scale-110"
                        style={{ border: `1px solid ${borderColor}` }}
                    />
                </motion.div>
            ))}
            <span className="text-xs text-[#6E6E6E] px-1">24+</span>
        </div>
    );
};

export default OverlappingImages;
