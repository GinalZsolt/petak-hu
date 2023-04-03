import axios from 'axios';
import type { User } from '../classes/User';
import type { Auction, Bidder } from '../interfaces/Auction';
import {Get, Patch, Post} from './dbQueries';
import { GetUserData } from './dbUser';


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
async function GetAllAuctions(token:string):Promise<Auction[]>{
    return await Get(token, 'auctions');
}
async function GetAuctionData(token:string, id:number):Promise<Auction|boolean>{
    let auction = await Get(token, 'auctions', 'ID', id).then(res=>res[0]) as Promise<Auction>;
    let users = await Get(token, 'users').then(res=>res) as Promise<User[]>;
    return await Promise.all([auction, users]).then(res=>{
        let user;
        try{
            user = res[1].find(e=>e.ID==res[0].userID);
        }
        catch {
            return false;
        }
        return {
            ...res[0],
            user: {
                email: user.email,
                fullname: user.fullname,
                name: user.name,
                phone: user.phone
            }
        } as Auction;
    })
}
async function PostNewBidder(token:string, data:BidderPost){
    return await Post(token, 'bidders', data);
}
async function PostNewAuctionPrice(token:string, id:number, data:number){
    return await Patch(token, 'auctions', 'ID', id, {
        price: data
    })
}
async function CloseAuctionAndSendMail(token:string, id:number, data:{
    userID:number,
    auctionID:number,
    auctionTitle:string,
    auctionPoster:{
        email:string,
        phone:string,
        fullname:string
    }  
}){
    if (await (await Patch(token,'auctions', "ID", id, {notified: 1})).affectedRows>0){
        axios.post('http://localhost:8080/mailing/to/'+data.userID, {
            auctionID:data.auctionID,
            auctionTitle:data.auctionTitle,
            auctionPosterEmail:data.auctionPoster.email,
            auctionPosterPhone:data.auctionPoster.phone,
            auctionPosterFullName:data.auctionPoster.fullname
        }).then(res=>{
            console.log(res);
        })
    }
}
async function AuctionPageAuctions(token:string):Promise<Array<Auction[]>>{
    let auctions = await (GetAllAuctions(token));
    return auctions.reduce((acc, current, index)=>{
        if (!(index%3   )){
            acc.push(auctions.slice(index, index+3));
        }
        return acc;
    }, [])
}
export { GetBidders, GetAuctionData, PostNewBidder, PostNewAuctionPrice, GetAuctions, GetAllAuctions, CloseAuctionAndSendMail, AuctionPageAuctions }