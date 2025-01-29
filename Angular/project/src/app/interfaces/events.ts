import { UserMin } from "./user-min";

export interface Events {
    users: UserMin[];
    id: number;
    nome: string;
    dataEvento: any;
    local: string;
}
