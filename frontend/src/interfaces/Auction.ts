import type { Coin } from "../classes/Coin/Coin";

export interface Auction{
    ID:number;
    coinID:number;
    userID:number;
    price:number;
    title:string;
    minBid:number;
    description:string;
    expiration:string;
}
export interface Bidder{
    userID:number;
    username:string,
    price:number;
    date:string;
}