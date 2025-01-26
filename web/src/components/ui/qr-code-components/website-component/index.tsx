import { Input } from '@shtcut-ui/react';
import React from 'react';
import ActionQrCodeTab from './actions-tab';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import QrCodeName from './qr-code-name';
import { QrCodeInterface } from '@shtcut/types/types';
import { linksTab } from '@shtcut/_shared/data';

const WebsiteComponent = ({ step, switchTab, register }: QrCodeInterface) => {
    return (
        <div className=" flex flex-col  gap-2">
            <section className="w-full h-24  bg-white rounded-[10px] shadow-sm border border-gray-100 ">
                <Stepper step={Number(step)} />
            </section>
            {step === 1 && (
                <div className="shadow-sm mt-2 border border-gray-100  rounded-[10px] gap-2">
                    <div className="bg-white p-[23px] rounded-[10px]">
                        <p className="font-medium text-sm mb-2">Website URL</p>
                        <Input
                            {...register('url', {
                                required: 'url link bio is required',
                                maxLength: {
                                    value: 50,
                                    message: 'url link bio cannot exceed 50 characters'
                                }
                            })}
                            type="url"
                            placeholder="https//shtcut/help/example/what-is-shtcut"
                        />
                    </div>
                </div>
            )}

            {step === 2 && <ActionQrCodeTab switchTab={switchTab} initialTabs={linksTab} />}
            {step === 3 && (
                <section className="  shadow-sm border border-gray-100  rounded-[10px] gap-2">
                    <QrCodeName />
                </section>
            )}
        </div>
    );
};

export default WebsiteComponent;
