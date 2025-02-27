import { Card } from '@shtcut-ui/react';
import React from 'react';
import { Calendar } from 'lucide-react';
import CardsActions from '../card-actions';
import { QRCode } from 'react-qrcode-logo';
import { EyeRadiusType } from '@shtcut/types/types';
import { formatDate } from '@shtcut/_shared';
import { QRCodeDataResponse } from '@shtcut/types/qr-code';

interface QrCodeCardProps {
    id: string;
    onChange?: () => void;
    data: QRCodeDataResponse;
    selectedIds: string[];
    handleDeleteQrCodeLink: () => void;
    handleNavigate: () => void;
}

const QrCodeCard = ({ id, data, selectedIds, onChange, handleDeleteQrCodeLink, handleNavigate }: QrCodeCardProps) => {
    const urlScan = data && data?.type === 'website' ? data?.url : `http://localhost:3000/qr-code/${data?.slug}`;

    return (
        <Card
            className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  "
            onClick={handleNavigate}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    <div className="relative top-1.5 checkbox-container">
                        <input
                            type="checkbox"
                            id={`qr-checkbox-${id}`}
                            checked={selectedIds.includes(data._id)}
                            onChange={onChange}
                            className="cbox"
                        />
                    </div>
                    <QRCode
                        id="shtcut-qrcode"
                        value={urlScan}
                        removeQrCodeBehindLogo={true}
                        ecLevel="L"
                        fgColor={data?.qrCode?.colors?.presetColor}
                        size={66}
                        logoWidth={30}
                        logoHeight={30}
                        logoImage={''}
                        qrStyle={data?.qrCode?.qrStyle}
                        eyeRadius={data?.qrCode?.eyeRadius as EyeRadiusType}
                    />
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">
                                {data?.title || data?.name} QR Code
                            </h1>
                            <p className="text-xs text-primary-0 font-normal">{data?.type}</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-[6px]">
                            <Calendar color="#2B2829" size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">{formatDate(data?.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <CardsActions handleDeleteQrCodeLink={handleDeleteQrCodeLink} />
            </div>
        </Card>
    );
};

export default QrCodeCard;
