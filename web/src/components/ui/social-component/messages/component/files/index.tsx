import { chatFileData } from '@shtcut/_shared/data';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const FilesTab = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const handleLabelClick = (labelId: string) => {
        setExpandedSection((prev) => (prev === labelId ? null : labelId));
    };

    return (
        <div className=" flex z-0 flex-col h-[500px] px-4">
            <h2 className="font-semibold ">Files</h2>
            <section className="flex-1  overflow-y-auto">
                {chatFileData.map((item, index) => (
                    <div key={item.id}>
                        <div
                            onClick={() => handleLabelClick(item.id)}
                            className={`cursor-pointer py-3  flex items-center justify-between text-sm ${expandedSection === item.id ? 'text-primary-0' : 'text-[#6E6E6E]'} ${
                                index === chatFileData.length - 1 ? '' : 'border-b'
                            }`}
                        >
                            <div className="flex items-center gap-x-2">
                                {React.createElement(item.icon, {
                                    size: 14,
                                    color: expandedSection === item.id ? '#2f64e9' : '#6E6E6E'
                                })}
                                {item.label}
                            </div>
                            {expandedSection === item.id ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </div>
                        {expandedSection === item.id && (
                            <div className="mt-2 grid grid-cols-4 gap-2">
                                {item.content ? (
                                    item.id === 'images' ? (
                                        item.content.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt="Preview"
                                                className="mt-4 object-cover w-full h-16 rounded-md"
                                                height={0}
                                                width={0}
                                            />
                                        ))
                                    ) : (
                                        item.content.map((url, index) => (
                                            <iframe
                                                key={index}
                                                src={url}
                                                title={`Video ${index}`}
                                                className="mt-4 w-full h-16 rounded-md"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            />
                                        ))
                                    )
                                ) : item.files ? (
                                    <>
                                        {item.files.map((file) => (
                                            <div key={file.id} className="mt-1 flex flex-col items-center">
                                                <Image
                                                    key={index}
                                                    src={'/images/pdf2.png'}
                                                    alt="Preview"
                                                    className=" object-cover w-full h-16 rounded-md"
                                                    height={0}
                                                    width={0}
                                                    unoptimized
                                                    priority
                                                />
                                                <p className="text-sm text-center"> {file.type}</p>
                                            </div>
                                        ))}
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default FilesTab;
