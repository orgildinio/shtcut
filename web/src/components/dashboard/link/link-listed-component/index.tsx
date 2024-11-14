import { Card, Checkbox, useToast } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import { Clock3, Tag } from 'lucide-react';
import CardsActions from '../card-actions';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { getApexDomain, truncate } from '@shtcut/_shared/helpers';
import { formatDate } from '@shtcut/_shared';
import { CiImageOff } from 'react-icons/ci';
import { GOOGLE_FAVICON_URL } from '@shtcut/_shared/constant';

const LinkListedComponent = ({
    edit,
    onClickNavigate,
    data,
    onDeleteClick,
    onDuplicateClick,
    onQrCodeClick,
    handleUpdateLink,
    onClickAchive,
    onClickShare
}: {
    edit?: boolean;
    data?: LinkNameSpace.Link;
    onClickNavigate?: (() => void) | undefined;
    onDeleteClick?: (() => void) | undefined;
    onDuplicateClick?: (() => void) | undefined;
    onQrCodeClick?: (() => void) | undefined;
    onClickAchive?: (() => void) | undefined;
    onClickShare?: (() => void) | undefined;
    handleUpdateLink?: (() => void) | undefined;
}) => {
    const { toast } = useToast();
    const apexDomain = getApexDomain(data?.target ?? '');
    const handleCopy = () => {
        const textToCopy = `${data?.domain?.name}/${data?.alias}`;
        if (textToCopy) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    toast({
                        title: 'Copy link ',
                        description: 'Link copied to clipboard!'
                    });
                })
                .catch((err) => {
                    toast({
                        title: 'Copy link ',
                        description: `Failed to copy text: ${err}`
                    });
                });
        }
    };
    return (
        <Card className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  ">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    {!edit && (
                        <div className="relative top-1">
                            <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                        </div>
                    )}
                    <div className=" border  w-[50px] h-[50px] rounded-full flex justify-center items-center">
                        {apexDomain ? (
                            <Image
                                src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                                width={18}
                                height={18}
                                alt={apexDomain}
                                unoptimized
                                priority
                            />
                        ) : (
                            <CiImageOff size={24} />
                        )}
                    </div>
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">{data?.title}</h1>
                            <p className="text-xs text-primary-0 font-normal">
                                {data?.domain?.name}/{data?.alias}
                            </p>
                            <a href={data?.target} target="_blank" className="text-[#2B2829] text-xs">
                                {truncate(data?.target ?? '', 100)}
                            </a>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Clock3 size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">
                                {data?.createdAt && formatDate(data?.createdAt ?? '')}
                            </span>
                            <div className="flex items-center space-x-1 w-[60px] h-6  rounded justify-center border bg-[#ECFFFC] border-[#0B7B69]">
                                <Tag size={14} color="#0B7B69" />
                                <span className="text-xs text-[#0B7B69]">Tags</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <CardsActions
                        numberOfClicks={data?.clicks ?? 0}
                        edit={edit}
                        handleCopy={handleCopy}
                        onDeleteClick={onDeleteClick}
                        onDuplicateClick={onDuplicateClick}
                        onQrCodeClick={onQrCodeClick}
                        onClickShare={onClickShare}
                        onClickAchive={onClickAchive}
                        handleUpdateLink={handleUpdateLink}
                        onClickNavigation={() => {
                            if (!edit && onClickNavigate) {
                                onClickNavigate();
                            }
                        }}
                    />
                </div>
            </div>
        </Card>
    );
};

export default LinkListedComponent;
