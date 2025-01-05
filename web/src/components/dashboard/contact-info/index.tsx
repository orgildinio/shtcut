import { Card, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import CountryStateSelectors from '@shtcut/components/country-select/country';
import { useAppDispatch } from '@shtcut/redux/store';
import useGeneralState from '@shtcut/hooks/general-state';
import { updateContactField } from '@shtcut/redux/slices/selects';

const ContactInfo = ({ isVisible, toggleVisibility }: { isVisible: boolean; toggleVisibility: () => void }) => {
    const dispatch = useAppDispatch();
    const { contactInfo } = useGeneralState();
    const { countryOptions, handleCountryChange, handleStateChange, selectedCountry, selectedState, stateOptions } =
        CountryStateSelectors();

    const handleInputChange = (key: keyof typeof contactInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateContactField({ key, value: e.target.value }));
    };
    const onCountryChange = (value: string) => {
        const countryName = handleCountryChange(value);
        dispatch(updateContactField({ key: 'country', value: countryName }));
    };

    const onStateChange = (value: string) => {
        const stateName = handleStateChange(value);
        dispatch(updateContactField({ key: 'state', value: stateName }));
    };

    return (
        <Card className="shadow-sm mt-4 py-4 px-6 border border-gray-100 ">
            <section className="flex justify-between ">
                <section className="flex flex-col gap-2">
                    <Label>Contact Information&apos;s</Label>
                    <p className="text-sm text-[#5A5555]">Enter details</p>
                </section>
                {isVisible ? (
                    <Minus onClick={toggleVisibility} className="cursor-pointer" />
                ) : (
                    <Plus onClick={toggleVisibility} className="cursor-pointer" />
                )}
            </section>
            {isVisible && (
                <section className="mt-4">
                    <section className="border-b pb-3 flex flex-col w-full gap-3">
                        <Input
                            placeholder="Phone Number"
                            value={contactInfo?.phoneNumber ?? ''}
                            onChange={handleInputChange('phoneNumber')}
                            type="text"
                        />
                        <Input
                            placeholder="Email Address"
                            type="email"
                            value={contactInfo?.email ?? ''}
                            onChange={handleInputChange('email')}
                        />
                        <Input
                            placeholder="Website URL"
                            value={contactInfo.websiteUrl}
                            onChange={handleInputChange('websiteUrl')}
                            type="url"
                        />
                    </section>
                    <section className="mt-4">
                        <Label>Address</Label>
                        <section className="flex flex-col gap-3 mt-4">
                            <Input
                                placeholder="Street Address"
                                value={contactInfo.streetAddress}
                                onChange={handleInputChange('streetAddress')}
                            />

                            <section className="flex  items-center gap-2">
                                <Select value={selectedCountry?.value ?? undefined} onValueChange={onCountryChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder="Country"
                                            className="text-sm placeholder:text-muted-foreground "
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countryOptions.map((country) => (
                                            <SelectItem key={country.value} value={country.value}>
                                                {country.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {stateOptions.length > 0 ? (
                                    <Select value={selectedState?.value ?? undefined} onValueChange={onStateChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder="State"
                                                className="placeholder:text-muted-foreground"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stateOptions.map((state) => (
                                                <SelectItem key={state.value} value={state.value}>
                                                    {state.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        placeholder="State"
                                        value={contactInfo.city}
                                        onChange={handleInputChange('state')}
                                    />
                                )}
                                <Input
                                    placeholder="Zip Code"
                                    value={contactInfo.zipCode}
                                    onChange={handleInputChange('zipCode')}
                                />
                            </section>
                            <Input placeholder="City" value={contactInfo.city} onChange={handleInputChange('city')} />
                        </section>
                    </section>
                </section>
            )}
        </Card>
    );
};

export default ContactInfo;
