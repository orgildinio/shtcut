import StarLoader from '@shtcut/components/loader/star-loader';
import React from 'react';
import LinkListedComponent from '../../link-listed-component';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { ModalType } from '@shtcut/types/types';

interface LinkDataComponentProps {
    isLoading: boolean;
    findAllLinksResponse: LinkNameSpace.Link[] | null;
    handleNavigate: (alias: string) => void;
    toggleSection: (modalType: ModalType, data: LinkNameSpace.Link) => void;
    handleUpdateLink: (data: LinkNameSpace.Link) => void;
    search: string;
}

const LinkDataComponent = ({
    findAllLinksResponse,
    isLoading,
    handleNavigate,
    handleUpdateLink,
    toggleSection,
    search
}: LinkDataComponentProps) => {
    return (
        <>
            {isLoading ? (
                <div className="flex flex-1 h-[70vh] justify-center items-center">
                    <StarLoader />
                </div>
            ) : findAllLinksResponse && findAllLinksResponse.length > 0 ? (
                <div className="flex flex-col gap-y-[14px] mt-8">
                    {findAllLinksResponse.map((data, index) => (
                        <div key={index}>
                            <LinkListedComponent
                                data={data}
                                onClickNavigate={() => handleNavigate(data.alias)}
                                onDeleteClick={() => toggleSection('deleteModal', data)}
                                onDuplicateClick={() => toggleSection('duplicateModal', data)}
                                onQrCodeClick={() => toggleSection('qrCodeModal', data)}
                                handleUpdateLink={() => handleUpdateLink(data)}
                                onClickAchive={() => toggleSection('archiveModal', data)}
                                onClickShare={() => toggleSection('shareModal', data)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-[60vh] justify-center items-center text-gray-500">
                    No data available for {search}
                </div>
            )}
        </>
    );
};

export default LinkDataComponent;
