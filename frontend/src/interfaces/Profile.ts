import type { User } from "./User";
import type { Auction } from "./Auction";
import type { Coin } from "./Coin";

export interface Profile{
    user:User;
    coins:Coin[];
    auctions:Auction[];
}