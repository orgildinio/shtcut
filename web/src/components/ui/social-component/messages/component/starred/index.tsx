import { ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import StarredCard from './components/starred-card';

const StarredComponent = () => {
    return (
        <div className=" flex z-0 flex-col h-[500px] px-4">
            <h2 className="font-semibold ">Starred Messsages</h2>
            <section className="flex flex-col mt-3 gap-y-6 flex-1  overflow-y-auto">
                <StarredCard />
                <StarredCard />
                <StarredCard />
                <StarredCard />
            </section>
        </div>
    );
};

export default StarredComponent;
