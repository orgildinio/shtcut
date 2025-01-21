import React from 'react';
import { Tabs, TabsList, TabsTrigger, Card, TabsContent } from '@shtcut-ui/react';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import TemplateCard from '../template-card';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import InfoField from '../info-field';

const WebCardPreview = ({ linkBioData }: { linkBioData: LinkBioDataResponse | undefined }) => {
    return (
        <div className="rounded-2xl  h-full w-full">
            <Tabs defaultValue="contact" className="w-full   ">
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
                <section className=" px-8 mt-4">
                    <TabsContent value="contact" className="w-full p-4">
                        <section className="space-y-4">
                            <InfoField
                                label="Mobile"
                                value={linkBioData?.contacts?.phone}
                                icon={<Phone size={16} color={linkBioData?.colors?.presetColor} />}
                            />
                            <InfoField
                                label="Email"
                                value={linkBioData?.contacts?.email}
                                icon={<Mail size={16} color={linkBioData?.colors?.presetColor} />}
                            />
                            <InfoField
                                label="Website"
                                value={linkBioData?.contacts?.website}
                                icon={<Globe size={16} color={linkBioData?.colors?.presetColor} />}
                                hasDivider={false}
                            />
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
                                            presetColor={linkBioData?.colors?.presetColor}
                                        />
                                    </a>
                                ))}
                        </section>
                    </TabsContent>
                    <TabsContent value="address" className="p-4">
                        <section className="space-y-4">
                            <InfoField
                                label="Street"
                                value={linkBioData?.address?.street}
                                color={linkBioData?.colors?.presetColor}
                            />
                            <InfoField
                                label="State"
                                value={linkBioData?.address?.state}
                                color={linkBioData?.colors?.presetColor}
                            />
                            <InfoField
                                label="Country"
                                value={linkBioData?.address?.country}
                                color={linkBioData?.colors?.presetColor}
                            />
                            <InfoField
                                label="City"
                                value={linkBioData?.address?.city}
                                color={linkBioData?.colors?.presetColor}
                            />
                            <InfoField
                                label="Zipcode"
                                value={linkBioData?.address?.zipCode}
                                hasDivider={false}
                                color={linkBioData?.colors?.presetColor}
                            />
                        </section>
                    </TabsContent>
                </section>
            </Tabs>
        </div>
    );
};

export default WebCardPreview;
