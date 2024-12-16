export interface User {
    id: number;
    username: string;
    email: string;
    phone_number?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    healthInsurance?: string;
    insuranceType?: string; // Privat oder gesetzlich
}