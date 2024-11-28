import SettingComponent from '@shtcut/components/dashboard/settings';
import { useTags } from '@shtcut/hooks/tags';
import React from 'react';

const SettingContainer = () => {
    const {
        findAllTagsResponse,
        isLoading,
        deleteTag,
        setLoadingState,
        isLoadingState,
        findAllTags,
        deleteTagResponse
    } = useTags({
        callTags: true
    });

    return (
        <SettingComponent
            findAllTagsResponse={findAllTagsResponse}
            isLoading={isLoading}
            deleteTag={deleteTag}
            isLoadingState={isLoadingState}
            setLoadingState={setLoadingState}
            findAllTags={findAllTags}
            deleteTagResponse={deleteTagResponse}
        />
    );
};

export default SettingContainer;
