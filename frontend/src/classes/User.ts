export class User {
    ID:number;
    image:string;
    fullname:string;
    email:string;
    contacts: any | null;
    private permission:number;
    constructor(data:any){
        this.ID = data.ID;
        this.image = data.imagefile;
        this.fullname = data.fullname;
        this.email = data.email;
        this.contacts = {
            phone: data.phone,
            address: data.address
        }
        this.permission = data.permission
    }
}