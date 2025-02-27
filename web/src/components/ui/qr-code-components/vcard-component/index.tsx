import React from 'react';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import PersonalInfoVCard from './personal-info-vcard';
import ActionQrCodeTab from '../website-component/actions-tab';
import QrCodeName from '../website-component/qr-code-name';
import { linksTab } from '@shtcut/_shared/data';

const VCardComponent = ({ step, defaultLinks }: { step?: number; defaultLinks?: Record<string, string> }) => {
    return (
        <div>
            <section className="w-full h-24  bg-white rounded-[10px] shadow-sm border border-gray-100 ">
                <Stepper step={step} />
            </section>
            <div>
                {step === 1 && <PersonalInfoVCard defaultLinks={defaultLinks} />}
                {step === 2 && <ActionQrCodeTab initialTabs={linksTab} />}
                {step === 3 && (
                    <section className=" mt-4 shadow-sm border border-gray-100  rounded-[10px] gap-2">
                        <QrCodeName />
                    </section>
                )}
            </div>
        </div>
    );
};

export default VCardComponent;
