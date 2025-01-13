import React from 'react';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import TemplateCard from '../template-card';

const WebCardPreview = ({ linkBioData }: { linkBioData: LinkBioDataResponse | undefined }) => {
    return (
        <div className=" bg-white h-full w-full">
            <section className="w-full p-4 flex flex-col gap-4">
                {linkBioData &&
                    linkBioData?.links.map((link) => (
                        <a href={link.url} className="flex w-full" target="_blank" key={link.id}>
                            <TemplateCard
                                color={linkBioData?.colors?.btnColor ?? ''}
                                label={link?.label}
                                image={link.image ?? ''}
                            />
                        </a>
                    ))}
            </section>
        </div>
    );
};

export default WebCardPreview;
