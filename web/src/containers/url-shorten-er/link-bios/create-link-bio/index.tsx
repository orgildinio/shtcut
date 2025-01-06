'use client';

import CreateLinkBioComponent from '@shtcut/components/ui/shorten-er/link-bios/create-link-bio';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import React from 'react';

const CreateLinkBioContainer = () => {
    const { linkBioActions, linkBiosState } = useLinkBios({});
    return <CreateLinkBioComponent linkBiosState={linkBiosState} linkBioActions={linkBioActions} />;
};

export default CreateLinkBioContainer;
