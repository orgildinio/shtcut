import StarLoader from '@shtcut/components/loader/star-loader';
import React from 'react';
import LinkListedComponent from '../../link-listed-component';
import { FindAllLinkResresponseType, LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { ModalType } from '@shtcut/types/types';
import PaginationTable from '@shtcut/components/pagination';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';
import { skeletonRows } from '@shtcut/components/card-skeleton';

interface LinkDataComponentProps {
    isLoading: boolean;
    findAllLinksResponse: FindAllLinkResresponseType | undefined;
    handleNavigate: (alias: string) => void;
    toggleSection: (modalType: ModalType, data: LinkNameSpace.Link) => void;
    handleUpdateLink: (data: LinkNameSpace.Link) => void;
    search: string;
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
}

const LinkDataComponent = ({
    findAllLinksResponse,
    isLoading,
    handleNavigate,
    handleUpdateLink,
    toggleSection,
    search,
    pagination,
    paginationActions
}: LinkDataComponentProps) => {
    return (
        <>
            {isLoading ? (
                <div className="flex flex-col gap-y-[14px] mt-8">{skeletonRows}</div>
            ) : findAllLinksResponse && findAllLinksResponse?.data && findAllLinksResponse?.data.length > 0 ? (
                <div className="flex flex-col gap-y-[14px] mt-8">
                    {findAllLinksResponse?.data.map((data, index) => (
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

            <section className="mt-6">
                <PaginationTable
                    pageSize={pagination.perPage ?? 10}
                    pageIndex={pagination.page - 1}
                    handleOnChange={paginationActions.handlePageChange}
                    totalItemsCount={findAllLinksResponse?.meta.pagination.totalCount ?? 0}
                    setPageIndex={paginationActions.setPage}
                    setPageSize={paginationActions.setPerPage}
                />
            </section>
        </>
    );
};

export default LinkDataComponent;
