import WebTemplate1 from '@shtcut/components/general-template/web-template/template-1';
import WebTemplate2 from '@shtcut/components/general-template/web-template/template-2';
import WebTemplate3 from '@shtcut/components/general-template/web-template/template-3';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import React from 'react';

const LinkBioDynamicComponent = ({ linkData, isLoading }: { linkData: any | undefined; isLoading: boolean }) => {
    return (
        <section>
            {linkData?.template === 'template_1' && <WebTemplate1 linkData={linkData} isLoading={isLoading} />}
            {linkData?.template === 'template_2' && <WebTemplate2 linkData={linkData} isLoading={isLoading} />}
            {linkData?.template === 'template_3' && <WebTemplate3 linkData={linkData} isLoading={isLoading} />}
        </section>
    );
};

export default LinkBioDynamicComponent;
