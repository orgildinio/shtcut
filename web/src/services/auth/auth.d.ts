import { Meta } from '@shtcut/_shared/namespace';

export interface OptionType {
    noErrorMessage?: boolean;
    noSuccessMessage?: boolean;
    errorMessage?: string;
    successMessage?: string;
}

export interface AuthResponseType {
    meta: Record<'token', string>;
    data: Dict;
}

export interface SocialAuthRequestType {
    payload: { socialType: 'facebook' | 'google' | 'twitter' | 'github'; accessToken: string };
    options?: OptionType;
}
export interface SignInRequestType {
    payload: Record<'email' & 'password', string>;
    options?: OptionType;
}

export interface SignUpRequestType {
    payload: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
    options?: OptionType;
}
export interface VerifyEmailRequestType {
    payload: { email: string; verificationCode: string };
    options?: OptionType;
}

export interface SendVerificationRequestType {
    payload: { email: string; type: 'email' | 'sms' };
    options?: OptionType;
}

export interface ForgotPasswordRequestType {
    payload: { email: string };
    options?: OptionType;
}

export interface UpdatePasswordRequestType {
    payload: { email: string; resetPasswordCode: string; password: string };
    options?: OptionType;
}

export interface ChangePasswordRequestType {
    payload: { currentPassword: string; password: string };
    options?: OptionType;
}

export interface LinkBioResponse extends Meta {
    data: LinkBioDataType;
}

export interface LinkBioDataResponse {
    publicId: string;
    links: LinkBioDataType[];
    name: string;
    profileImage: string;
    template: string;
    title: string;
    workspace: string;
    slug: string;
    description: string;
    colors: {
        background?: string;
        btnColor?: string;
        presetColor?: string;
    };
    active: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
    id: string;
}

export interface LinkBioDataPayload {
    payload: {
        colors: {
            bgColor?: string;
            btnColor?: string;
            presetColor?: string;
        };
        description: string;
        links: LinkBioDataType[];
        name: string;
        profileImage: string;
        template: string;
        title: string;
        workspace: string;
    };
}
