import type { Ban } from './Ban';

export class User {
    public ID: number;
    public imagefile: string;
    public name: string;
    public fullname: string;
    public email: string;
    public phone: string;
    public address: string;
    private permission: number;
    public moderations: Array<Ban> | null;
    constructor(data: UserData) {
        this.ID = data.id;
        this.imagefile = data.imagefile;
        this.name = data.name;
        this.fullname = data.fullname;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.permission = data.permission;
        this.moderations = data.bans;
    }
    public GetPermission(): string {
        switch (this.permission) {
            case 0: return "Látogató";
            case 1: return "Felhasználó";
            case 2: return "Adminisztrátor";
        }
    }
    public IsBanned():boolean{
        for (let i = 0; i < this.moderations.length; i++) {
            if (new Date()<this.moderations[i].banTime) return true;
        }
        return false;
    }
}
interface UserData {
    id: number,
    imagefile: string,
    name: string,
    fullname: string,
    email: string,
    phone: string,
    address: string,
    passwd: string,
    permission: number,
    bans: Array<Ban> | null
}