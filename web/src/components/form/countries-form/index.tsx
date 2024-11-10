import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import { countries } from '@shtcut/_shared/data/countries';
import { CountryType } from '@shtcut/types/types';
import React, { useState } from 'react';

interface CountriesInputProps {
    countryCode: string;
    url: string;
    onChange: (data: { countryCode: string; url: string }) => void;
    includePlusPrefix?: boolean;
    classNames?: string;
    showDivider?: boolean;
    showFlag?: boolean;
    required?: boolean;
    noRadius?: boolean;
    inputClassName?: string;
    selectClassName?: string;
}

const CountriesInput: React.FC<CountriesInputProps> = ({
    countryCode,
    url,
    onChange,
    includePlusPrefix = false,
    classNames,
    showDivider = true,
    showFlag = true,
    required = true,
    inputClassName,
    selectClassName
}) => {
    const handleCountryChange = (value: string) => {
        onChange({ countryCode: value, url });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;

        onChange({ countryCode, url });
    };

    return (
        <div className={`flex border w-full rounded-full items-center h-10 ${classNames}`}>
            <Select value={countryCode} onValueChange={handleCountryChange}>
                <SelectTrigger
                    className={`${includePlusPrefix ? 'w-40' : !showFlag ? 'w-20' : 'w-[130px]'} ${selectClassName || 'border-none rounded-l-full border-r-2'}`}
                >
                    <SelectValue>
                        <div className="flex items-center">
                            {showFlag && (
                                <img
                                    loading="lazy"
                                    width="24"
                                    srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                                    alt={countryCode}
                                    className="mr-2"
                                />
                            )}
                            <span className="flex items-center">{countryCode}</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {countries.map((country: CountryType) => (
                        <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center">
                                <img
                                    loading="lazy"
                                    width="24"
                                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    alt={country.label}
                                    className="mr-2"
                                />
                                <span>{country.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="URL"
                className={`border-0 ${showDivider ? 'border-l rounded-l-none' : ''} px-2 h-10 ${inputClassName}`}
                required={required}
            />
        </div>
    );
};

export default CountriesInput;
