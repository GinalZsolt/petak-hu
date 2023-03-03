import type { CoinAmountStatistic, CoinWorthStatistic } from "../services/dbStatistics";

export interface ModalData{
    title:string;
    promise:Promise<CoinAmountStatistic[]> | Promise<CoinWorthStatistic[]>;
}