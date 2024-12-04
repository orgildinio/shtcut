'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@shtcut-ui/react';
import { AppButton } from '@shtcut/components';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.'
    })
});

interface VerifyEmailFormProps {
    handleVerifyEmailSubmit: (payload: Dict) => void;
    isLoading: boolean;
    error?: Dict;
    handleResendVerification: () => void;
    email: string;
    mobileDesktop?: boolean;
}

export function VerifyEmailPasswordForm(props: VerifyEmailFormProps) {
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const { isLoading, handleVerifyEmailSubmit, handleResendVerification, email, mobileDesktop } = props;
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: ''
        }
    });

    const handleFormSubmit = (data: z.infer<typeof FormSchema>) => {
        handleVerifyEmailSubmit({
            verificationCode: data.pin
        });
    };

    const handleResendClick = () => {
        setCanResend(false);
        setCountdown(30);
        handleResendVerification();
    };

    useEffect(() => {
        if (!canResend) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        setCanResend(true);
                        return prev;
                    }
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [canResend]);

    return (
        <div className="">
            <p className="my-4">
                Check your email, a verification was sent to {email || 'amanda@gmail.com'} reset your password
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className=" mt-8 ">
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        className="w-full mt-6"
                                        render={({ slots }) => (
                                            <InputOTPGroup className="w-full flex items-center gap-x-3 sm:gap-x-5 lg:gap-x-[30px]">
                                                {slots.map((slot, index) => (
                                                    <Fragment key={index}>
                                                        <InputOTPSlot
                                                            className="h-14 w-14  rounded-[10px] md:rounded-[15px] border border-[#D8DADC]"
                                                            {...slot}
                                                        />
                                                    </Fragment>
                                                ))}{' '}
                                            </InputOTPGroup>
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center flex-col items-center">
                        <p className=" mt-10 text-center text-sm text-[#64748B]">
                            Send Code in{' '}
                            <span className="text-[#151314] font-bold">
                                {countdown > 0 ? `00:${String(countdown).padStart(2, '0')}` : '00:00'}
                            </span>
                        </p>
                        <Button
                            variant="link"
                            className={`text-center ${
                                canResend ? 'text-primary-0 hover:text-blue-500' : 'text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={handleResendClick}
                            disabled={!canResend}
                        >
                            Resend
                        </Button>
                    </div>
                    <AppButton
                        className={mobileDesktop ? 'w-full' : 'w-[95%]'}
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Verify
                    </AppButton>
                </form>
            </Form>
        </div>
    );
}
