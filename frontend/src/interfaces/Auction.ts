export interface Auction{
    ID:number;
    coinID:number;
    userID:number;
    user:{
        name:string,
        email:string,
        fullname:string,
        phone:string;
    }
    price:number;
    title:string;
    minBid:number;
    description:string;
    expiration:string;
    notified:boolean;
}
export interface Bidder{
    userID:number;
    username:string,
    price:number;
    date:string;
}