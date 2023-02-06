export class Auction{
    public ID:number;
    public price:number;
    public title:string;
    public minBid:number;
    public description:string;
    public expiration:Date;
    public bidders:Array<Bidder>;
    constructor (data:any){
        this.ID = data.ID;
        this.price=data.price;
        this.title=data.title;
        this.minBid=data.minBid;
        this.description=data.description;
        this.expiration=data.expiration;
    }
}



interface Bidder{
    userName:string;
    amount:number;
    date:Date;
}