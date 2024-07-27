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
    users: Users;
    video: string;

}

export interface Users {
    $collectionId: string;
    $createdAt: Date;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: Date;
    accountId: string;
    avatar: string;
    email: string;
    username: string;
}