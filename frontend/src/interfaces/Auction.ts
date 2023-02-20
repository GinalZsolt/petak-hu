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
    username:string,
    price:number;
    date:string;
}