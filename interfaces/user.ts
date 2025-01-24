
export interface User {
    id: number;
    name: string;
    email: string;
    roleId: number;
    created: Date;
    password?: string | null; // Opcional y permite valores nulos si no es requerido
}