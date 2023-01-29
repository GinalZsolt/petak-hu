import type { User } from "./User";
export class Coin {
    ID:number;
    owner:User;
    name:string;
    worth:number;
    description:string;
    images:any;
    constructor(data:any){
        this.ID=data.ID;
        this.name = data.name;
        this.worth = data.worth;
        this.description = data.description;
        this.images = {
            head:data.headfile,
            tail:data.tailfile
        }
    }
}