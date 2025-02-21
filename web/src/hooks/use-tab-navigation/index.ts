import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Tab {
    id: string;
    label: string;
}

export const useTabNavigation = (tabs: Tab[]) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentTab = searchParams.get('tab') || tabs[0]?.id || 'info';
    const selectedTabIndex = tabs.findIndex((tab) => tab.id === currentTab);

    const handleTabChange = (index: number) => {
        const newTab = tabs[index].id;
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', newTab);
        router.push(`${pathname}?${params.toString()}`, { shallow: true } as any);
    };
    const resetTab = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('tab');
        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { shallow: true } as any);
    };

    return { currentTab, selectedTabIndex, handleTabChange, resetTab };
};
