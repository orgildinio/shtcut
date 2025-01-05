import { Card, Checkbox, Label } from '@shtcut-ui/react';
import { setFile } from '@shtcut/redux/slices/selects';
import { useAppDispatch } from '@shtcut/redux/store';

import { Download, Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const PdfCardComponent = ({ toggleVisibility, isVisible }: { toggleVisibility: () => void; isVisible: boolean }) => {
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            dispatch(setFile(file));
            setSelectedFile(file);
            setFileUrl(URL.createObjectURL(file));
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    const handleCancelFile = () => {
        setSelectedFile(null);
        setFileUrl(null);
    };
    return (
        <Card className="shadow-sm mt-4 py-4 px-6 border border-gray-100 ">
            <section>
                <section className="flex justify-between ">
                    <section className="flex flex-col gap-2">
                        <Label>PDF File</Label>
                        <p className="text-sm text-[#5A5555]">Import file</p>
                    </section>
                    {isVisible ? (
                        <Minus onClick={toggleVisibility} className="cursor-pointer" />
                    ) : (
                        <Plus onClick={toggleVisibility} className="cursor-pointer" />
                    )}
                </section>
                {selectedFile ? (
                    <section>
                        <section className="border mt-4 gap-4 flex items-center px-4 rounded-md py-2">
                            <section className="border w-14 h-14 flex justify-center items-center rounded-md">
                                <Image src={'/images/pdf.png'} width={24} height={24} alt="pdf" />
                            </section>
                            <section>
                                <p className="font-medium">{selectedFile.name}</p>
                                <p className="text-xs font-medium">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </section>
                            <X onClick={handleCancelFile} className="cursor-pointer ml-auto" size={16} />
                        </section>
                        <section className="flex items-center mt-4 gap-2">
                            <Checkbox />
                            <p className="text-xs font-medium">Directly show PDF File</p>
                        </section>
                        {/* {fileUrl && (
                            <section className="mt-4">
                                <iframe src={fileUrl} title="PDF Preview" className="w-full h-64 border rounded-md" />
                            </section>
                        )} */}
                    </section>
                ) : (
                    <section className="mt-4">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            id="customFileInput"
                            className="hidden cursor-pointer "
                        />
                        <label
                            htmlFor="customFileInput"
                            className=" w-full text-center py-2 px-4   rounded-md cursor-pointer border border-dashed h-32 flex flex-col justify-center items-center gap-2"
                        >
                            <section className="bg-primary-0 w-8 h-8 rounded-md flex justify-center items-center">
                                <Download size={14} className="text-white" />
                            </section>
                            <p className="text-xs">
                                Upload or <span className="text-primary-0">browse</span> to import PDF
                            </p>
                        </label>
                    </section>
                )}
            </section>
        </Card>
    );
};

export default PdfCardComponent;
