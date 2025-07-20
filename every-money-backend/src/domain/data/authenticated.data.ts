export type UserAuthenticatedData = {
    name: string;
    email: string;
    id: number;
};

export type AuthenticatedData = {
    userAuthenticated: UserAuthenticatedData;
    accessToken: string;
};
    