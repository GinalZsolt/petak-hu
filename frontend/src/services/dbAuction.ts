import type { Auction } from '../interfaces/Auction';
import {Get, Patch, Post} from './dbQueries';

interface BidderInfo{
    userID:number;
    auctionID:number;
    amount:number;
    date:string;
}


async function GetAuctionData(token:string, id:number):Promise<Auction>{
    return await Get(token, 'auctions', 'ID', id).then(res=>res[0]).catch(err=>err.response);
}
async function PostNewBidder(token:string, id:number, data:BidderInfo){
    return await Post(token, 'bidders', data);
}
async function PostNewAuctionPrice(token:string, id:number, data:number){
    return await Patch(token, 'auctions', 'ID', id, {
        price: data
    })
}


export { GetAuctionData, PostNewBidder, PostNewAuctionPrice }