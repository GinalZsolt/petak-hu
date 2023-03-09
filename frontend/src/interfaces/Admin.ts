import type { Statistics } from "../services/dbStatistics";
import type { Banned } from "../services/dbUser";

export interface ModalData{
    title:string;
    promise:Promise<Statistics[]>| Promise<Banned[]>;
}