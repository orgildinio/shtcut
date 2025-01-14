import React from 'react';
import { Tabs, TabsList, TabsTrigger, Card, TabsContent } from '@shtcut-ui/react';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import TemplateCard from '../template-card';
import { MapPin } from 'lucide-react';

const WebCardPreview = ({ linkBioData }: { linkBioData: LinkBioDataResponse | undefined }) => {
    return (
        <div className="rounded-2xl   bg-red-300 h-full w-full">
            <Tabs defaultValue="links" className="w-full   ">
                <TabsList className=" bg-transparent m-0 h-12 border-none flex gap-4 p-6 px-12 items-center  w-full">
                    <TabsTrigger
                        value="contact"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        CONTACT
                    </TabsTrigger>
                    <TabsTrigger
                        value="address"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        <MapPin size={15} /> ADDRESS
                    </TabsTrigger>
                    <TabsTrigger
                        value="links"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        LINKS
                    </TabsTrigger>
                </TabsList>
                <section className="bg-slate-400 px-8 mt-4">
                    <TabsContent value="contact" className="w-full">
                        <section className="w-full p-4 flex flex-col gap-4">
                            <p>no data</p>
                        </section>
                    </TabsContent>
                    <TabsContent value="links" className="w-full">
                        <section className="w-full p-4 flex flex-col gap-4">
                            {linkBioData &&
                                linkBioData?.links.map((link) => (
                                    <a href={link.url} className="flex w-full" target="_blank" key={link.id}>
                                        <TemplateCard
                                            color={linkBioData?.colors?.btnColor ?? ''}
                                            label={link?.label}
                                            image={link.image ?? ''}
                                        />
                                    </a>
                                ))}
                        </section>
                    </TabsContent>
                    <TabsContent value="address" className="p-4 ">
                        <p>no data</p>
                    </TabsContent>
                </section>
            </Tabs>
        </div>
    );
};

export default WebCardPreview;
