import { Button, Input } from '@shtcut-ui/react';
import { Lock } from 'lucide-react';
import React from 'react';

const LinkPasswordPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <section className="flex items-center justify-center flex-col  w-full gap-y-5">
                <section
                    className="bg-primary-0 w-36 h-36 rounded-full
                 flex justify-center text-white items-center"
                >
                    <Lock size={64} />
                </section>
                <section className="flex flex-col items-center  w-full sm:w-80 mx-auto ">
                    <h1 className="font-bold">Password Required</h1>
                    <p className="text-sm text-center text-[#5A5555]">
                        This link is password protected. Please enter the password to view it.
                    </p>
                </section>
                <section className="w-1/3 flex flex-col gap-y-6">
                    <Input className="w-full" placeholder="Enter Password" />
                    <Button className="w-full text-[13px] bg-primary-0">Submit</Button>
                </section>
            </section>
        </div>
    );
};

export default LinkPasswordPage;
