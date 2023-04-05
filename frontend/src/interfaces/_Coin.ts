import type { CoinTag } from "./CoinTag";
export interface Coin{
    ID:number;
    name:string;
    worth:number;
    description:string;
    images:Images;
    tags:Array<CoinTag>;
    userID:number;
}
interface Images{
    headfile:string,
    tailfile:string
};
interface CoinData{
    ID:number,
    name:string,
    worth:number,
    description:string,
    headfile:string,
    tailfile:string,
    tags:Array<CoinTag>
};