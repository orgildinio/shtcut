interface MetaData {
    meta: {
        statusCode: number;
        success: boolean;
        message: string;
        pagination?: {
            totalCount: number;
            perPage: number;
            current: number;
            currentPage: string;
        };
    };
}

export interface TagsApiResponse extends MetaData {
    data: TagResponse[];
}

export interface TagsApiResponseObject extends MetaData {
    data: TagResponse;
}

export interface TagResponse extends AppObject {
    id: string;
    publicId: string;
    name: string;
    type: string;
    user: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    _v: number;
}

interface CreateTagPayload {
    color: string;
    name: string;
}
