import type { Auction, Bidder } from '../interfaces/Auction';
import {Get, Patch, Post} from './dbQueries';


interface BidderPost{
    userID:number;
    auctionID:number;
    amount:number;
    date:string;
}


async function GetBidders(token:string, auctionID:number):Promise<Bidder[]>{
    return await Get(token, 'auctionbidders', 'auctionID', auctionID);
}
async function GetAuctions(token:string, userID:number):Promise<Auction[]>{
    return await Get(token, 'auctions', 'userID', userID).then(res=>res).catch(err=>err.response);
}
async function GetAuctionData(token:string, id:number):Promise<Auction>{
    return await Get(token, 'auctions', 'ID', id).then(res=>res[0]).catch(err=>err.response);
}
async function PostNewBidder(token:string, data:BidderPost){
    return await Post(token, 'bidders', data);
}
async function PostNewAuctionPrice(token:string, id:number, data:number){
    return await Patch(token, 'auctions', 'ID', id, {
        price: data
    })
}


export { GetBidders, GetAuctionData, PostNewBidder, PostNewAuctionPrice, GetAuctions }