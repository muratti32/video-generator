export interface IVideo {
    $collectionId: string;
    $createdAt: Date;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: Date;
    prompt: string;
    thumbnail: string;
    title: string;
    users: User[];
    video: string;

}

export interface User {
    $collectionId: string
    $createdAt: string
    $databaseId: string
    $id: string
    $permissions: any[]
    $tenant: string
    $updatedAt: string
    accountId: string
    avatar: string
    email: string
    username: string
}

export interface UploadFileResponse {
    $createdAt: string
    $id: string
    $permissions: string[]
    $updatedAt: string
    bucketId: string
    chunksTotal: number
    chunksUploaded: number
    mimeType: string
    name: string
    signature: string
    sizeOriginal: number
}

