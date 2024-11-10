import { Button, Switch } from '@shtcut-ui/react';
import CountriesInput from '@shtcut/components/form/countries-form';
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
interface CountryData {
    countryCode: string;
    url: string;
}

interface GeoTargetingProps {
    setCountriesData: React.Dispatch<React.SetStateAction<CountryData[]>>;
    watchLink: string;
    countriesData: CountryData[];
}
const GeoTargeting = ({ setCountriesData, watchLink, countriesData }: GeoTargetingProps) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    const addCountryEntry = () => {
        setCountriesData([...countriesData, { countryCode: '', url: '' }]);
    };

    const handleCountriesDataChange = (index: number, newData: { countryCode: string; url: string }) => {
        const updatedCountriesData = [...countriesData];
        updatedCountriesData[index] = newData;
        setCountriesData(updatedCountriesData);
    };

    const removeCountryEntry = (index: number) => {
        const updatedCountriesData = countriesData.filter((_, i) => i !== index);
        setCountriesData(updatedCountriesData);
    };

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Geo Targeting</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Target specific countries or regions</p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} disabled={!watchLink} />
            </div>

            {isSwitchOn && (
                <div className="mt-3 flex flex-col gap-2">
                    {countriesData.map((countryData, index) => (
                        <section className="flex items-center gap-2">
                            <CountriesInput
                                countryCode={countryData.countryCode}
                                url={countryData.url}
                                onChange={(newData) => handleCountriesDataChange(index, newData)}
                                classNames="rounded-md"
                            />
                            <Trash2 className="cursor-pointer" size={18} onClick={() => removeCountryEntry(index)} />
                        </section>
                    ))}

                    {countriesData.length < 10 && (
                        <div className="flex gap-2">
                            <Button
                                onClick={addCountryEntry}
                                type="button"
                                className="w-full mt-4 text-xs rounded bg-primary-0 h-8"
                            >
                                {countriesData.length > 0 ? 'Add more' : 'Add Geo Targeting'}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GeoTargeting;
