import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Switch } from '@shtcut-ui/react';
import React, { useState } from 'react';

const AndroidTarget = ({ form, watchLink }: { form: any; watchLink: string }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Android Targeting</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Target Android users only</p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} disabled={!watchLink} />
            </div>
            {isSwitchOn && (
                <div className="mt-2">
                    <FormField
                        control={form.control}
                        name="android"
                        render={({ field }) => (
                            <FormItem className="border-none w-full">
                                <FormLabel className="text-xs">URL</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="https://"
                                        className="h-10  focus-visible:ring-0 shadow-none w-full"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default AndroidTarget;
