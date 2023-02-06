import type { CoinTag } from "./CoinTag";
export class Coin{
    public ID:number;
    public name:string;
    public worth:number;
    public description:string;
    public images:Images;
    public tags:Array<CoinTag>;
    constructor(data:CoinData){
        this.ID=data.ID;
        this.name=data.name;
        this.worth=data.worth;
        this.description=data.description;
        this.images = {
            headfile:data.headfile,
            tailfile:data.tailfile
        };
        this.tags = data.tags;
    }
}
interface Images{
    headfile:string,
    tailfile:string
};
interface CoinData{
    ID:number,
    name:string,
    worth:number,
    description:string,
    headfile:string,
    tailfile:string,
    tags:Array<CoinTag>
};