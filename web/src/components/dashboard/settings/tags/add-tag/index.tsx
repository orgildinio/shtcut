import { Button, Input, Label, useToast } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { useTags } from '@shtcut/hooks/tags';
import { TagResponse } from '@shtcut/types/tags';
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CreateTags = ({ onClose, singleTag }: { onClose: () => void; singleTag?: TagResponse | null }) => {
    const { toast } = useToast();
    const {
        createTags,
        updateTags,
        updateTagsResponse,
        isLoadingState,
        createTagsResponse,
        setLoadingState,
        setFindAllTagsResponse,
        findAllTags
    } = useTags({
        callTags: true
    });

    const tagsColor = [
        { name: 'Green', color: '#0b7b69' },
        { name: 'Red', color: '#dc2625' },
        { name: 'Yellow', color: '#ffcc00' },
        { name: 'Purple', color: '#7f56d9' },
        { name: 'Blue', color: '#007aff' }
    ];
    const [inputValue, setInputValue] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('#0B7B69');

    console.log('single:::', singleTag);

    useEffect(() => {
        if (singleTag) {
            setInputValue(singleTag?.name || '');
            setSelectedColor(singleTag?.color || '#0B7B69');
        } else {
            setInputValue('');
            setSelectedColor('');
        }
    }, [singleTag]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleSubmit = async () => {
        if (!inputValue.trim() || !selectedColor) {
            toast({
                title: singleTag ? 'Update Tag' : 'Add Tag',
                description:
                    !inputValue.trim() && !selectedColor
                        ? 'Please provide both a tag name and a color.'
                        : !inputValue.trim()
                          ? 'Please provide a tag name.'
                          : 'Please select a color.',
                variant: 'destructive'
            });
            return;
        }
        setLoadingState('creating', true);
        const payload = {
            name: inputValue.trim(),
            color: selectedColor
        };
        try {
            if (singleTag) {
                const response = await updateTags(singleTag?._id, payload);
                toast({
                    title: 'Tag Updated',
                    description: response?.meta?.message || 'Tag updated successfully.',
                    variant: 'default'
                });
            } else {
                await createTags(payload);
                toast({
                    title: 'Tag Added',
                    description: createTagsResponse?.meta?.message || 'Tag created successfully.',
                    variant: 'default'
                });
            }

            setLoadingState('creating', false);
            setInputValue('');
            setSelectedColor('');
            onClose();
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Submission failed. Please try again.';
            setLoadingState('creating', false);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMessage
            });
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-sm font-semibold">{singleTag ? 'Update Tag' : 'Add Tag'}</h1>
            <p className="text-xs text-[#898384] pb-2 mt-1 border-b">
                {' '}
                {singleTag ? 'Modify the selected tag.' : 'Use tags to organize your links.'}
            </p>
            <div className="mt-4">
                <Label>Tag Name</Label>
                <Input value={inputValue} onChange={handleInputChange} className="mt-2" />
            </div>
            <section className="mt-4">
                <Label className="text-[#5A5555] text-sm">Choose tag color</Label>
                <section className="flex items-center gap-2 mt-2">
                    {tagsColor.map((tg) => (
                        <section
                            key={tg.color}
                            onClick={() => handleColorSelect(tg.color)}
                            className={`h-6 cursor-pointer flex justify-center gap-2 items-center px-2 rounded ${
                                selectedColor === tg.color ? '' : ''
                            }`}
                            style={{
                                border: `1px solid ${tg.color}`,
                                backgroundColor: `${tg.color}20`,
                                color: tg.color
                            }}
                        >
                            <p className="text-xs">{tg.name}</p>
                            {selectedColor === tg.color && (
                                <section
                                    className="w-3 h-3 flex justify-center items-center rounded-full"
                                    style={{
                                        border: `1px solid ${tg.color}`,
                                        backgroundColor: `${tg.color}`,
                                        color: 'white'
                                    }}
                                >
                                    <Check size={8} />
                                </section>
                            )}
                        </section>
                    ))}
                </section>
                {inputValue && (
                    <section className="my-4">
                        <h1 className="text-sm font-semibold flex items-center gap-x-2">
                            Tag :{' '}
                            <span
                                className="h-6 flex justify-center items-center px-2 w-fit rounded"
                                style={{
                                    border: `1px solid ${selectedColor || ''}`,
                                    color: selectedColor,
                                    backgroundColor: `${selectedColor}20`
                                }}
                            >
                                {inputValue}
                            </span>{' '}
                        </h1>
                    </section>
                )}
            </section>
            <LoadingButton loading={isLoadingState} className="bg-primary-0 w-full mt-6" onClick={handleSubmit}>
                {singleTag ? 'Update Tag' : 'Add Tag'}
            </LoadingButton>
        </div>
    );
};

export default CreateTags;
