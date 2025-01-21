import { Link, MapPin, User, UserRound } from 'lucide-react';
import React from 'react';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import Image from 'next/image';
import SkeletonLoaderWeb from '../components/skeleton-loader';
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@shtcut-ui/react';
import InfoField from '../components/info-field';
import { Phone, Mail, Globe } from 'lucide-react';

const WebTemplate1 = ({
    linkBioData,
    isLoading
}: {
    linkBioData: LinkBioDataResponse | undefined;
    isLoading: boolean;
}) => {
    return (
        <div>
            {isLoading ? (
                <SkeletonLoaderWeb />
            ) : (
                <>
                    {' '}
                    <section className=" h-[372px] " style={{ backgroundColor: linkBioData?.colors.presetColor }}>
                        <div className="flex justify-center gap-y-2 flex-col items-center pt-8">
                            {linkBioData?.profileImage ? (
                                <Image
                                    src={linkBioData?.profileImage}
                                    width={130}
                                    height={130}
                                    className="rounded-full"
                                    alt={linkBioData.name}
                                />
                            ) : (
                                <User size={130} />
                            )}

                            <section>
                                <h1 className="font-semibold text-center text-white ">Sammy Jackson</h1>
                                <p className=" text-center text-white ">Co-Founder</p>
                            </section>
                        </div>
                    </section>
                    <section className="w-[508px] relative bottom-24 h-[500px] mx-auto">
                        <div className="rounded-2xl   bg-white shadow-sm border h-full w-full  px-12 ">
                            <Tabs defaultValue="contact" className="w-full   pt-4">
                                <TabsList className=" bg-transparent m-0 h-12 border-none flex gap-4 py-6 px-0 items-center  w-full">
                                    <TabsTrigger
                                        value="contact"
                                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                                    >
                                        <UserRound size={16} /> CONTACT
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="address"
                                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                                    >
                                        <MapPin size={16} /> ADDRESS
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="links"
                                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                                    >
                                        <Link size={16} /> LINKS
                                    </TabsTrigger>
                                </TabsList>
                                <Card className=" mt-4 shadow-sm">
                                    <TabsContent value="contact" className="w-full p-4">
                                        <section className="space-y-4">
                                            <InfoField
                                                label="Mobile"
                                                value={linkBioData?.contacts?.phone}
                                                icon={<Phone size={16} />}
                                            />
                                            <InfoField
                                                label="Email"
                                                value={linkBioData?.contacts?.email}
                                                icon={<Mail size={16} />}
                                            />
                                            <InfoField
                                                label="Website"
                                                value={linkBioData?.contacts?.website}
                                                icon={<Globe size={16} />}
                                                hasDivider={false}
                                            />
                                        </section>
                                    </TabsContent>
                                    <TabsContent value="links" className="w-full shadow-none border-none">
                                        <section>
                                            {linkBioData && linkBioData?.links?.length > 0 ? (
                                                <section className="w-full p-4 flex flex-col gap-4">
                                                    {linkBioData &&
                                                        linkBioData?.links.map((link, index) => (
                                                            <a
                                                                href={link.url}
                                                                className={`flex w-full gap-4  ${
                                                                    index !== linkBioData.links.length - 1
                                                                        ? 'border-b '
                                                                        : ''
                                                                } py-3`}
                                                                target="_blank "
                                                                key={link.id}
                                                            >
                                                                <section>
                                                                    {linkBioData?.profileImage ? (
                                                                        <Image
                                                                            src={linkBioData?.profileImage ?? ''}
                                                                            alt={linkBioData?.title}
                                                                            width={24}
                                                                            height={24}
                                                                            className="rounded-md"
                                                                        />
                                                                    ) : (
                                                                        <Link size={15} />
                                                                    )}
                                                                </section>
                                                                <p className="text-sm ">{linkBioData?.title}</p>
                                                            </a>
                                                        ))}
                                                </section>
                                            ) : (
                                                <section>
                                                    <p>no data </p>
                                                </section>
                                            )}
                                        </section>
                                    </TabsContent>
                                    <TabsContent value="address" className="p-4">
                                        <section className="space-y-4">
                                            <InfoField label="Street" value={linkBioData?.address?.street} />
                                            <InfoField label="State" value={linkBioData?.address?.state} />
                                            <InfoField label="Country" value={linkBioData?.address?.country} />
                                            <InfoField label="City" value={linkBioData?.address?.city} />
                                            <InfoField
                                                label="Zipcode"
                                                value={linkBioData?.address?.zipCode}
                                                hasDivider={false}
                                            />
                                        </section>
                                    </TabsContent>
                                </Card>
                            </Tabs>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default WebTemplate1;
