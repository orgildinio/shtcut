'use client';

import { FormControl, FormField, FormItem, FormMessage, Input, Separator, Switch } from '@shtcut-ui/react';
import React, { useState } from 'react';

const UTMbuilder = ({ form, watchLink }: { form: any; watchLink: string }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-[13px] font-medium">UTM Builder</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">
                        Add UTM parameters to your short links for conversion tracking
                    </p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} disabled={!watchLink} />
            </div>
            {isSwitchOn && (
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center rounded-md border  h-10 ">
                        <p className="w-24 text-[13px] text-center text-[#cdcdcd]">Source</p>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="source"
                            render={({ field }) => (
                                <FormItem className=" border-none  w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="source"
                                            className="h-9 focus-visible:ring-0  border-none rounded-none rounded-r-xl shadow-none w-full "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center rounded-md border  h-10 ">
                        <p className="w-24 text-[13px] text-center text-[#cdcdcd]">Medium</p>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="medium"
                            render={({ field }) => (
                                <FormItem className=" border-none  w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="medium"
                                            className="h-9 focus-visible:ring-0  border-none rounded-none rounded-r-xl shadow-none w-full "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center rounded-md border  h-10 ">
                        <p className="w-24 text-[13px] text-center text-[#cdcdcd]">Campaign</p>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="campaign"
                            render={({ field }) => (
                                <FormItem className=" border-none  w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="campaign"
                                            className="h-9 focus-visible:ring-0  border-none rounded-none rounded-r-xl shadow-none w-full "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center rounded-md border  h-10 ">
                        <p className="w-24 text-[13px] text-center text-[#cdcdcd]">Term</p>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="term"
                            render={({ field }) => (
                                <FormItem className=" border-none  w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="term"
                                            className="h-9 focus-visible:ring-0  border-none rounded-none rounded-r-xl shadow-none w-full "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center rounded-md border  h-10 ">
                        <p className="w-24 text-[13px] text-center text-[#cdcdcd]">Content</p>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className=" border-none  w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="content"
                                            className="h-9 focus-visible:ring-0  border-none rounded-none rounded-r-xl shadow-none w-full "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UTMbuilder;
