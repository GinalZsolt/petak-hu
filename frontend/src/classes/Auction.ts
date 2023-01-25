import type { Coin } from "./Coin";
import type { User } from "./User";
export class Auction{
    ID:number;
    coin:Coin;
    user:User;
    price:number;
    title:string;
    minBid:number;
    description:string;
    expiration:Date;
    constructor(data:any){
        this.ID = data.ID;
        this.price = data.price;
        this.title = data.title;
        this.minBid = data.minBid;
        this.description = data.description;
        this.expiration = data.expiration;
    }
}