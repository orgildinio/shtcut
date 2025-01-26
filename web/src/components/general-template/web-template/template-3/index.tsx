import React from 'react';
import SkeletonLoaderWeb from '../components/skeleton-loader';
import Image from 'next/image';
import { Globe, Link, Mail, MapPin, Phone, User, UserRound } from 'lucide-react';
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@shtcut-ui/react';
import InfoField from '../components/info-field';
import TemplateCard from '../components/template-card';

const WebTemplate3 = ({ linkData, isLoading }: { linkData: any | undefined; isLoading: boolean }) => {
    return (
        <section>
            {isLoading ? (
                <SkeletonLoaderWeb />
            ) : (
                <>
                    <section
                        className="h-[372px] relative"
                        style={{
                            backgroundImage: linkData?.profileImage ? `url(${linkData.profileImage})` : undefined,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div
                            className="absolute inset-0 bg-opacity-40"
                            style={{
                                backgroundColor: linkData?.colors?.background
                                    ? linkData?.colors?.background === '#ffffff'
                                        ? 'rgba(0, 0, 0, 0.3)'
                                        : linkData?.colors?.background
                                    : 'rgba(0, 0, 0, 0.3)'
                            }}
                        />
                        <section className="items-center flex justify-center left-0 right-0 z-20 absolute bottom-[-30px] mx-auto">
                            <Card
                                className="rounded-full w-fit mx-auto
                         h-fit  p-3 shadow-none border items-center flex justify-center   m-0 mb-0 mt-0"
                            >
                                {linkData?.profileImage ? (
                                    <Image
                                        src={linkData?.profileImage}
                                        width={130}
                                        height={130}
                                        className="rounded-full"
                                        alt={linkData.name}
                                    />
                                ) : (
                                    <User size={130} />
                                )}
                            </Card>
                        </section>
                    </section>
                    <Card
                        className="w-[508px] relative  mx-auto pb-10 "
                        style={{ backgroundColor: linkData?.colors?.background }}
                    >
                        <div className=" ">
                            <section className="pt-14">
                                <h1 className="font-semibold text-center  ">{linkData?.name}</h1>
                                <p className=" text-center  ">{linkData?.description}</p>
                            </section>
                        </div>{' '}
                        <section className="pt-4 ">
                            <div className="   h-full w-full  px-12 ">
                                <Tabs
                                    defaultValue="contact"
                                    className="w-full   pt-4 shadow-none bg-transparent  border-none"
                                >
                                    <TabsList className=" m-0 h-12 border-none flex gap-4 py-6 shadow-none bg-transparent px-0 items-center  w-full">
                                        <TabsTrigger
                                            value="contact"
                                            className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB]  "
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
                                                    value={linkData?.contacts?.phone}
                                                    icon={<Phone size={16} color={linkData?.colors?.presetColor} />}
                                                />
                                                <InfoField
                                                    label="Email"
                                                    value={linkData?.contacts?.email}
                                                    icon={<Mail size={16} color={linkData?.colors?.presetColor} />}
                                                />
                                                <InfoField
                                                    label="Website"
                                                    value={linkData?.contacts?.website}
                                                    icon={<Globe size={16} color={linkData?.colors?.presetColor} />}
                                                    hasDivider={false}
                                                />
                                            </section>
                                        </TabsContent>
                                        <TabsContent value="links" className="w-full shadow-none border-none">
                                            <section className="w-full p-4 flex flex-col gap-4">
                                                {linkData &&
                                                    linkData?.links.map((link) => (
                                                        <a
                                                            href={link.url}
                                                            className="flex w-full"
                                                            target="_blank"
                                                            key={link.id}
                                                        >
                                                            <TemplateCard
                                                                color={linkData?.colors?.btnColor ?? ''}
                                                                label={link?.label}
                                                                image={link.image ?? ''}
                                                                presetColor={linkData?.colors?.presetColor}
                                                            />
                                                        </a>
                                                    ))}
                                            </section>
                                        </TabsContent>
                                        <TabsContent value="address" className="p-4">
                                            <section className="space-y-4">
                                                <InfoField
                                                    label="Street"
                                                    value={linkData?.address?.street}
                                                    color={linkData?.colors?.presetColor}
                                                />
                                                <InfoField
                                                    label="State"
                                                    value={linkData?.address?.state}
                                                    color={linkData?.colors?.presetColor}
                                                />
                                                <InfoField
                                                    label="Country"
                                                    value={linkData?.address?.country}
                                                    color={linkData?.colors?.presetColor}
                                                />
                                                <InfoField
                                                    label="City"
                                                    value={linkData?.address?.city}
                                                    color={linkData?.colors?.presetColor}
                                                />
                                                <InfoField
                                                    label="Zipcode"
                                                    value={linkData?.address?.zipCode}
                                                    hasDivider={false}
                                                    color={linkData?.colors?.presetColor}
                                                />
                                            </section>
                                        </TabsContent>
                                    </Card>
                                </Tabs>
                            </div>
                        </section>
                    </Card>{' '}
                </>
            )}
        </section>
    );
};

export default WebTemplate3;
