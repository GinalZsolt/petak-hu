import type { Statistics } from "../services/dbStatistics";
import type { Banned } from "../services/dbUser";
import type { Auction } from "./Auction";

export interface ModalData{
    title:string;
    promise:Promise<Statistics[]>| Promise<Banned[]>| Promise<Auction[]>;
}