export interface Owner 
{
    FirstLogin: boolean,
    TwoFaAuthEnabled: boolean,
    TwofaAuthSecret: string,
    avatarUrl: string,
    createdaAt: string,
    email: string,
    friendStatus: string,
    hash: string,
    id: number,
    nickname: string,
    provider: string,
    state: string,
    updatedAt: string,
}
export interface Users {
    TwofaAutEnabled: boolean,
    TwofaAutSecret : boolean,
    avatarUrl: string,
    createdAt: string,
    email: string,
    friendStatus: string,
    id: number,
    nickname: string,
    provider: string,
    state: string,
    updatedAt: string,
}

export interface Channel{
    createdAt: string,
    id: number,
    isGroup: boolean,
    isPrivate: boolean,
    isPrivateKey: boolean,
    isProtected: boolean,
    lastMessageAt: string,
    name: string,
    owner: Owner,
    ownerID: number,
    password: string,
    uid: string, 
    users: Users[],
}

