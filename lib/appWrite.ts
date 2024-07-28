import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.avk.aora",
    projectId: "668a91030039dbca8d01",
    databaseId: '668a92c10017a5f461f7',
    userCollectionId: '668a92f90034e0c8d2c4',
    videoCollectionId: '668a932a0014535b6610',
    storageId: '668a952c002c27c65fb6'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = appWriteConfig;

const client = new Client();
const avatars = new Avatars(client);
client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)
    ;

const account = new Account(client);
const databases = new Databases(client);

export const createAccount = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error();
        const avatarUrl = avatars.getInitials(username);
        console.log(`halo aba url:`, avatarUrl);
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                username,
                avatar: avatarUrl,
                accountId: newAccount.$id
            }
        )
        if (!newUser) throw new Error();
        return newUser;
    } catch (error: any) {
        console.log(`halo create user error:`, error);
        throw new Error(error);
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = account.createEmailPasswordSession(email, password);
        if (!session) throw new Error();
        return session;
    } catch (error) {
        console.log(`halo sign in error:`, error);
        throw new Error();
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error();
        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [
                Query.equal("accountId", currentAccount.$id)
            ]
        )
        if (!currentUser) throw new Error();
        return currentUser.documents[0];
    } catch (error: any) {
        console.log(`halo get current user error:`, error);
        throw new Error(error);

    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        if (!posts) throw new Error("No post found");
        return posts;
    } catch (error: any) {
        console.log(`halo get all posts error:`, error);
        throw new Error(error.message);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(7)
            ]
        )
        if (!posts) throw new Error("No atest post found");
        return posts;
    } catch (error: any) {
        console.log(`halo get Latest posts error:`, error);
        throw new Error(error.message);
    }
}

export const searchPosts = async (query: string | undefined) => {
    if (!query) throw new Error("No Search Parameter")
    console.log(`halo search query:`, query);
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.search("title", query)
            ]
        )
        if (!posts) throw new Error("No search post found");
        return posts;
    } catch (error: any) {
        console.log(`halo get Latest posts error:`, error);
        throw new Error(error.message);
    }
}