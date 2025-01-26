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
        call: true
    });

    return (
        <SettingComponent
            findAllTagsResponse={findAllTagsResponse?.data}
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
