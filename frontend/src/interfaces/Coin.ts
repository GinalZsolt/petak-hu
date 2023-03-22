import type { TagInterface } from "./Tags";

export interface Coin{
    ID:number;
    name:string;
    worth:number;
    description:string;
    headfile:string;
    tailfile:string;    
    userID: number;
    uploadDate:string;
    tags?: TagInterface[] 
}