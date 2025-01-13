import React from 'react';
import { BsTelephoneFill, BsEnvelope } from 'react-icons/bs';
import { FaGlobeAfrica } from 'react-icons/fa';
import Template_1 from './template_1';
import Template_2 from './template_2';
import Template_3 from './template_3';
import { useAppDispatch } from '@shtcut/redux/store';
import { setSelectedTemplate } from '@shtcut/redux/slices/selects';
import useGeneralState from '@shtcut/hooks/general-state';

const TemplatesComponent = () => {
    const dispatch = useAppDispatch();
    const { activeTemplateString, presetColorString } = useGeneralState();
    const handleSelectTemplate = (template: string) => {
        dispatch(setSelectedTemplate(template));
    };

    const contactActions = [
        {
            name: 'Phone',
            icon: <BsTelephoneFill size={10} />
        },
        {
            name: 'Email',
            icon: <BsEnvelope size={10} />
        },
        {
            name: 'Website',
            icon: <FaGlobeAfrica size={10} />
        }
    ];

    return (
        <div className="bg-[#F7F7F7] w-full p-4">
            <p className="font-medium my-4 ">Templates</p>
            <section className="flex gap-2 ">
                <Template_1
                    handleSelectTemplate={handleSelectTemplate}
                    contactActions={contactActions}
                    activeTemplate={activeTemplateString ?? ''}
                    presetColor={presetColorString}
                />
                <Template_2
                    handleSelectTemplate={handleSelectTemplate}
                    contactActions={contactActions}
                    activeTemplate={activeTemplateString ?? ''}
                    presetColor={presetColorString}
                />
                <Template_3
                    handleSelectTemplate={handleSelectTemplate}
                    contactActions={contactActions}
                    activeTemplate={activeTemplateString ?? ''}
                    presetColor={presetColorString}
                />
            </section>
        </div>
    );
};

export default TemplatesComponent;
