import axios from "axios";
import type { TagInterface, TagType } from "../interfaces/Tags";
import { BackendURL } from "../stores";

async function GetTagTypes(token:string):Promise<TagType[]>{
    return await axios.get(BackendURL+'/api/tagcategories', {
        headers:{
            'Authorization': 'JWT '+token
        }
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response;
    })
}

export {GetTagTypes}