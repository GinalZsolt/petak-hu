import axios from "axios";
interface Permission {
    permission: number;
}
export async function GetPerms(Token?:string):Promise<Permission>{
    return await axios.get('http://localhost:8080/api/users/user-data', {
        headers:{
            'Authorization':'JWT '+Token
        }
    }).then(res=>res.data).catch(err=>console.error(err));
}