import { Post } from '@nestjs/common';
export interface ClientInformation {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export type AuthTokenOptions = {
  id: string;
  name: string;
  error?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  picture?: string;
  username: string;
  additionalSettings?: {
    title: string;
    description: string;
    value: any;
    regex?: string;
  }[];
};

export interface ISocialIntegrationAuthenticator {
  authenticate: () => Promise<AuthTokenOptions>;
}

export type PostOptions<T = any> = {
  id: string;
  message: string;
  settings: T;
  media?: any;
};

export type MediaContent = {
  type: 'image' | 'video';
  url: string;
  path: string;
};

export interface ISocialIntegration {
  post(id: string, accessToken: string, postDetails: PostOptions[]);
}
