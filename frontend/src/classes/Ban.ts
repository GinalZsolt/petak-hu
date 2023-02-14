export class Ban{
    private ID:number;
    public banTime:Date;
    constructor(data:BanData){
        this.ID = data.ID;
        this.banTime = data.banTime;
    }
}

interface BanData{
    ID:number;
    banTime:Date
}