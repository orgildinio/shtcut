'use client';
import { DomainNameSpace } from '@shtcut/_shared/namespace/domain';
import { DomainsComponent } from '@shtcut/components/dashboard';
import { useDomain } from '@shtcut/hooks/domain';
import { useUser } from '@shtcut/hooks/user';
import React, { useState } from 'react';

const DomainsContainer = () => {
    const { loggedInUserData } = useUser({ callLoggedInUser: true });
    const { data } = loggedInUserData;
    const { data: user } = data || {};

    const { findAllDomainsResponse, isLoading } = useDomain({
        callDomain: Boolean(user?.id),
        filter: { user: user?.id }
    });

    const [showModal, setShowModal] = useState(false);
    const [cnModal, setCnModal] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const handleModalShow = (open: boolean) => {
        setShowModal(open);
    };
    const handleModalCn = (open: boolean) => {
        setCnModal(open);
    };
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };
    return (
        <DomainsComponent
            handleModalShow={handleModalShow}
            showModal={showModal}
            setShowModal={setShowModal}
            handleModalCn={handleModalCn}
            cnModal={cnModal}
            setCnModal={setCnModal}
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
            handleTabClick={handleTabClick}
            findAllDomainsResponse={findAllDomainsResponse ?? []}
        />
    );
};

export default DomainsContainer;
