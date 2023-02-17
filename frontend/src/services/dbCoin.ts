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

async function UploadCoin(Coin,token:string){
    return await axios.post(BackendURL+"/api/coins",{
        headers:{
            'Authorization': 'JWT '+token
        },
        data:Coin
    }).then(results=>results.data.insertId)
}

async function UploadTag(tag,token:string) {
    await axios.post(BackendURL+"/api/tagdescriptions",{
        headers:{
            'Authorization': 'JWT '+token
        },
        data:{description:tag.descriptionID}}
        ).then(
            async (res)=>{
                tag.descriptionID=res.data.insertId
                await axios.post(BackendURL+"/api/cointags",{
                    headers:{
                        'Authorization': 'JWT '+token
                    },
                    data:tag}
                    )
            }
        )
}

export {GetTagTypes,UploadCoin,UploadTag}