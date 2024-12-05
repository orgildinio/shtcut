'use client';

import { Dict, toast } from '@shtcut-ui/react';
import WorkSpaceMain from '@shtcut/components/ui/work-space/workspace-main';
import WorkSpaceSideBar from '@shtcut/components/ui/work-space/workspace-sidebar';
import { useWorkspace } from '@shtcut/hooks';
import { get } from 'lodash';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { redirect } from 'next/navigation';

const WorkSpaceContainerPage = () => {
    const [step, setStep] = useState(1);
    const [moduleValues, setModuleValues] = useState<string[]>([]);
    const [workspaceType, setWorkspaceType] = useState<'team' | 'personal'>('personal');
    const { createWorkspace, createWorkspaceResponse } = useWorkspace({});
    const { isSuccess, isLoading, isError, error, data } = createWorkspaceResponse;
    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleOnSelectModule = (value: string) => {
        setModuleValues((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };
    const form = useForm<{
        name: string;
        type: string;
        capacity: string;
        [key: string]: any;
    }>({
        defaultValues: {
            name: '',
            type: '',
            capacity: ''
        }
    });

    const { watch } = form;
    const handleNext = () => {
        if (workspaceType === 'personal') {
            if (step === 1) {
                const name = watch('name');
                if (!name) {
                    toast({
                        title: 'Validation Error',
                        variant: 'destructive',
                        description: 'Workspace name is required'
                    });
                    return;
                }
            }
        } else if (workspaceType === 'team') {
            if (step === 1) {
                const name = watch('name');
                const capacity = watch('capacity');
                if (!name) {
                    toast({
                        title: 'Validation Error',
                        variant: 'destructive',
                        description: 'Workspace name is required'
                    });
                    return;
                } else if (!capacity) {
                    toast({
                        title: 'Validation Error',
                        variant: 'destructive',
                        description: 'Number of Users is required'
                    });
                    return;
                }
            }
        }

        if (step === 2 && moduleValues.length === 0) {
            toast({
                title: 'Validation Error',
                variant: 'destructive',
                description: 'At least one module must be selected'
            });
            return;
        }

        if ((workspaceType === 'team' && step === 3) || (workspaceType !== 'team' && step === 2)) {
            form.handleSubmit(handleFormSubmit)();
        } else if ((workspaceType === 'team' && step < 3) || (workspaceType !== 'team' && step < 2)) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleOptionChange = (value: 'team' | 'personal') => {
        setWorkspaceType(value);
    };

    if (isSuccess) {
        const slug = get(data, ['data', 'slug']);
        redirect(`/url/${slug}/links`);
    }

    if (isError) {
        console.error('Error creating workspace:', errorMessage);
    }

    const handleFormSubmit = (values: Dict) => {
        const emailFields = Object.keys(values).filter((key) => key.startsWith('email'));
        const emailArray = emailFields.map((key) => values[key]).filter(Boolean);

        const personalPayload = {
            name: get(values, ['name']),
            type: workspaceType,
            modules: moduleValues,
            redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL || '',
        };
        const teamPayload = {
            name: get(values, ['name']),
            capacity: get(values, ['capacity']),
            type: workspaceType,
            ...(emailArray.length > 0 && { memberEmails: emailArray }),
            modules: moduleValues,
            redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
        };
        const allPayload = workspaceType === 'team' ? teamPayload : personalPayload;
        createWorkspace({
            payload: allPayload,
            options: {
                successMessage: 'Welcome, your workspace is successfully created'
            }
        });
    };

    return (
        <div className="mx-auto px-4">
            <section className="flex py-4 h-screen">
                <WorkSpaceSideBar step={step} userValue={workspaceType} />
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full">
                        <WorkSpaceMain
                            step={step}
                            userValue={workspaceType}
                            handleOptionChange={handleOptionChange}
                            form={form}
                            handleNext={handleNext}
                            isLoading={isLoading}
                            handlePrevious={handlePrevious}
                            modules={moduleValues}
                            handleSelect={handleOnSelectModule}
                        />
                    </form>
                </FormProvider>
            </section>
        </div>
    );
};

export default WorkSpaceContainerPage;
