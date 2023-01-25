export class User {
    ID:Number;
    image:String;
    fullname:String;
    email:String;
    contacts: any | null;
    permission:Number;
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