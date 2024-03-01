export interface IClientLogin {
    id: number | null;
    login: string | null;
    balance: number | null;
    active: boolean;
    createdAt: string | null;
    roleId: number | null;
    statusId: number | null;
    currencyId: number | null;
    isPaymentSystemUser: boolean | null;
    role: string | null;
    permission: {
        canAddSameRole: boolean | null;
        canTransaction: boolean | null;
        canCreateRoles: boolean | null;
    };
    currency: string;
    path: string | null;
}
