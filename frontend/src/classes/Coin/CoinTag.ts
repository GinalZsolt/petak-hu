export class CoinTag {
    public ID:number;
    public name:string;
    public color:string;
    public description:string;
    constructor(data:TagData){
        this.ID=data.ID;
        this.name=data.name;
        this.color=data.color;
        this.description=data.description;
    }
}
interface TagData{
    ID:number,
    name:string,
    color:string,
    description:string
}