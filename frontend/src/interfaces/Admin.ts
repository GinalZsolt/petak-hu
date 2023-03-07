import type { Statistics } from "../services/dbStatistics";

export interface ModalData{
    title:string;
    promise:Promise<Statistics>;
}