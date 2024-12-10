import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@shtcut-ui/react';
import { Download } from 'lucide-react';
import React, { useState } from 'react';
import { toJpeg, toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { PiQrCode, PiFolders, PiPencilSimpleLine } from 'react-icons/pi';
import { FiDownload } from 'react-icons/fi';
import QRCode from 'qrcode';
const DownloadBtn = ({ qrCodeRef, value }: { qrCodeRef: any; value: string }) => {
    const [svg, setSvg] = useState<string | null>(null);
    const generateSVG = async () => {
        const svgString = await QRCode.toString(value, { type: 'svg' });
        setSvg(svgString);
    };

    const handleDownloadPNG = async () => {
        if (qrCodeRef.current) {
            const png = await toPng(qrCodeRef.current);
            saveAs(png, 'qrcode.png');
        }
    };
    const handleDownloadJPEG = async () => {
        if (qrCodeRef.current) {
            const jpeg = await toJpeg(qrCodeRef.current, { quality: 0.95 });
            saveAs(jpeg, 'qrcode.jpeg');
        }
    };
    const handleDownloadSVG = () => {
        if (svg) {
            const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
            saveAs(blob, 'qrcode.svg');
        } else {
            console.error('SVG data is not available.');
        }
    };

    React.useEffect(() => {
        generateSVG();
    }, []);

    return (
        <div className="w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <Button className="w-full flex items-center h-8 text-xs gap-x-2 bg-primary-0">
                        <FiDownload size={14} />
                        Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24" align="end" forceMount>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-x-2"
                            onClick={handleDownloadSVG}
                        >
                            <PiPencilSimpleLine /> SVG
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-x-2"
                            onClick={handleDownloadPNG}
                        >
                            <PiQrCode />
                            PNG
                        </DropdownMenuItem>{' '}
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-x-2"
                            onClick={handleDownloadJPEG}
                        >
                            <PiFolders />
                            JPEG
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DownloadBtn;
