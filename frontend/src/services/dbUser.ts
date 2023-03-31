import type { User } from "../classes/User";
import axios from 'axios';
import { Get } from "./dbQueries";
import {Token} from '../stores';
import type { Profile } from "../interfaces/Profile";
import type { Auction } from "../interfaces/Auction";
import type { Coin } from "../interfaces/Coin";
import type { TagInterface } from "../interfaces/Tags";

interface Moderations{
    ID:number,
    userID:number,
    date:string,
    banTime:string
}

interface DBUser{
    ID:number,
    name:string,
    email:string
}

export interface Banned{
    ID:number,
    userID:number,
    startdate:string,
    banTime:string,
    email:string,
    name:string,
}

async function GetUserData(id:number, token:string):Promise<User>{
    return await Get(token, 'users', 'ID', id);
}
async function GetUserProfile(id:number, token:string):Promise<Profile>{
    let user = await Get(token, 'users', 'ID', id) as Promise<User[]>;
    let auctions = await Get(token, 'auctions', 'userID', id) as Promise<Auction[]>;
    let coins = await Get(token, 'coins', 'userID', id) as Promise<Coin[]>;
    let tags = await Get(token, 'tags') as Promise<TagInterface[]>;

    return Promise.all([user, auctions, coins, tags]).then(async (res)=>{
        
        return {
            user: {
                ...res[0][0]
            },
            auctions: res[1].filter(g=>g.userID==res[0][0].ID).map(e=>{
                return {
                    ID: e.ID,
                    userID: e.userID,
                    coinID: e.coinID,
                    description: e.description,
                    expiration: e.expiration,
                    minBid: e.minBid,
                    notified: e.notified,
                    price: e.price,
                    title: e.title,
                } as Auction
            }),
            coins: res[2].filter(g=>g.userID==id).map(e=>{
                return {
                    ID: e.ID,
                    description: e.description,
                    headfile: e.headfile,
                    tailfile: e.tailfile,
                    name: e.name,
                    uploadDate: e.uploadDate,
                    userID: e.userID,
                    worth: e.worth,
                    tags: res[3].filter(z=>z.coinID==e.ID)
                } as Coin
            })
        } as Profile
    })
}
async function GetBanned(token:string):Promise<Banned[]> {
    let moderations:Promise<Moderations[]> = axios.get('http://localhost:8080/api/moderations',{headers:{"Authorization":"JWT "+token}})
    let users:Promise<DBUser[]> = axios.get('http://localhost:8080/api/users',{headers:{"Authorization":"JWT "+token}})
    return Promise.all([moderations,users]).then(res=>
        res[0].data.map( e=>
            {
                let user = res[1].data.find(g=>g.ID==e.userID);
                return {
                    ID:e.ID,
                    userID: user.ID,
                    startdate: e.date,
                    banTime:e.banTime,
                    email:user.email,
                    name:user.name
                } as Banned
            }
            )as Banned[]
    )
}
export { GetUserData, GetBanned, GetUserProfile };