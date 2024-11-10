import { Card, Modal } from '@shtcut-ui/react';
import React, { useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import CardsActions from '../card-actions';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { QRCode } from 'react-qrcode-logo';
import { formatDate } from '@shtcut/_shared';
import QrCodeModal from '../../link/link-component/qrcode-modal';

interface QrCodeCardProps {
    data: LinkNameSpace.Link;
    handleCheckboxChange: (id: string, isChecked: boolean) => void;
}
type ModalType = 'deleteModal' | 'duplicateModal' | 'qrCodeModal' | null;

const QrCodeCard = ({ handleCheckboxChange, data }: QrCodeCardProps) => {
    const qrCodeRef = useRef(null);
    const [showSections, setShowSections] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);
        handleCheckboxChange(data?._id, isChecked);
    };
    const toggleSection = (type?: ModalType) => {
        setModalType(type || null);
        setShowSections(type !== null);
    };

    return (
        <Card className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  ">
            <div className="flex justify-between items-center">
                <div className="flex ">
                    <div className="relative top-2 checkbox-container">
                        <input
                            type="checkbox"
                            id={`qr-checkbox-${data?._id}`}
                            checked={isChecked}
                            onChange={onCheckboxChange}
                            className="cbox"
                        />
                    </div>
                    <QRCode
                        id={data?._id}
                        value={`https://${data?.domain?.slug}/${data?.alias}`}
                        size={66}
                        qrStyle={'squares'}
                    />
                    <div className=" relative top-2">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">{data?.title}</h1>
                            <p className="text-xs text-primary-0 font-normal">
                                {data?.domain?.name}/${data?.alias}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-[6px]">
                            <Calendar color="#2B2829" size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">
                                {' '}
                                {data?.createdAt && formatDate(data?.createdAt ?? '')}
                            </span>
                        </div>
                    </div>
                </div>
                <CardsActions onClickDownload={() => toggleSection('qrCodeModal')} />
            </div>
            <Modal onClose={() => setShowSections(false)} showModel={showSections} setShowModal={setShowSections}>
                {modalType === 'qrCodeModal' && data && <QrCodeModal data={data} qrCodeRef={qrCodeRef} />}
            </Modal>
        </Card>
    );
};

export default QrCodeCard;
