'use client';

import React, { useState, useEffect } from 'react';
import ColorsQrCode from './colors-component';
import LogosQrCode from './logos-qrcode';
import FramesSelector from '../../qr-code-frames/frame-selector';
import QrCodeShapes from './qrcode-shape';
import PresetTab from '../preset-tab';
import { Card } from '@shtcut-ui/react';
import { LinksTab } from '@shtcut/types/link';
import { useAppDispatch } from '@shtcut/redux/store';
import { setSelectedTab } from '@shtcut/redux/slices/selects';
import useGeneralState from '@shtcut/hooks/general-state';

const ActionQrCodeTab = ({ initialTabs }: { switchTab?: string; initialTabs: LinksTab[] }) => {
    const dispatch = useAppDispatch();
    const { selectedTab, tabParams } = useGeneralState();
    // Initialize the tabs

    const [tabs, setTabs] = useState(initialTabs);

    useEffect(() => {
        if (tabParams === 'vCard') {
            const newTabs = [{ id: 'vCard', label: 'vCard' }, ...initialTabs];
            setTabs(newTabs);
            dispatch(setSelectedTab(0));
        }
    }, [tabParams]);

    const handleTabClick = (index: number) => {
        dispatch(setSelectedTab(index));
    };

    return (
        <Card className="shadow-sm mt-4 py-4 px-6 border border-gray-100 ">
            <div className="flex flex-col gap-1">
                <p className="font-medium">Appearance</p>
                <p className="text-xs text-[#433E3F]">Customize style and template</p>
            </div>
            <div className="w-80 mt-4">
                <PresetTab
                    tabs={tabs}
                    selectedTabIndex={selectedTab as number}
                    onTabClick={handleTabClick}
                    activeTextClassName="text-white"
                />
            </div>
            {tabParams === 'vCard' && (
                <div className="pt-10">
                    {selectedTab === 0 && <ColorsQrCode />}
                    {selectedTab === 1 && <FramesSelector />}
                    {selectedTab === 2 && <QrCodeShapes />}
                    {selectedTab === 3 && <LogosQrCode />}
                    {selectedTab === 4 && <ColorsQrCode selectedTabIndex={selectedTab} />}
                </div>
            )}
            {tabParams === 'website' && (
                <div className="pt-10">
                    {selectedTab === 0 && <FramesSelector />}
                    {selectedTab === 1 && <QrCodeShapes />}
                    {selectedTab === 2 && <LogosQrCode />}
                    {selectedTab === 3 && <ColorsQrCode />}
                </div>
            )}

            {tabParams === 'multi' && (
                <div className="pt-10">
                    {selectedTab === 0 && <ColorsQrCode />} {selectedTab === 1 && <FramesSelector />}
                    {selectedTab === 2 && <QrCodeShapes />}
                    {selectedTab === 3 && <LogosQrCode />}
                    {selectedTab === 4 && <ColorsQrCode selectedTabIndex={selectedTab} />}
                </div>
            )}
        </Card>
    );
};

export default ActionQrCodeTab;
