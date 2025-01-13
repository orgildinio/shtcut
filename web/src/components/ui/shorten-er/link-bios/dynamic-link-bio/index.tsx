import WebTemplate1 from '@shtcut/components/general-template/web-template/template-1';
import WebTemplate2 from '@shtcut/components/general-template/web-template/template-2';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import React from 'react';

const LinkBioDynamicComponent = ({
    linkBioData,
    isLoading
}: {
    linkBioData: LinkBioDataResponse | undefined;
    isLoading: boolean;
}) => {
    return (
        <section>
            {linkBioData?.template === 'template_1' && <WebTemplate1 linkBioData={linkBioData} isLoading={isLoading} />}
            {linkBioData?.template === 'template_2' && <WebTemplate2 linkBioData={linkBioData} isLoading={isLoading} />}
        </section>
    );
};

export default LinkBioDynamicComponent;
