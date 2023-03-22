import axios from "axios";
import type { TagInterface, TagType } from "../interfaces/Tags";
import type { Coin } from "../interfaces/Coin";
import { BackendURL } from "../stores";
import { Get } from "./dbQueries";

async function GetTagTypes(token: string): Promise<TagType[]> {
    return await axios.get(BackendURL + '/api/tagcategories', {
        headers: {
            'Authorization': 'JWT ' + token
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err.response;
    })
}

async function GetCoin(id:number, token:string):Promise<Coin>{
    let coin = await axios.get(BackendURL+'/api/coins/ID/'+id, {
        headers:{
            'Authorization': 'JWT '+token
        }
    }).then(res=>res.data[0]) as Promise<Coin>;
    let tags = await axios.get(BackendURL+'/api/tags/coinID/'+id).then(res=>res.data) as Promise<TagInterface[]>;
    return await Promise.all([coin, tags]).then(res=>{
        return {
            ...res[0],
            tags: res[1].map(e=>{
                return {
                    ID: e.ID,
                    coinID: res[0].ID,
                    description: e.description,
                    name: e.name,
                    color: e.color,
                }
            })
        }
    })
    .catch(err=>err.response.data);

}


async function UploadCoin(Coin, token: string) {
    return await axios.post(BackendURL + "/api/coins", Coin, {
        headers: {
            'Authorization': 'JWT ' + token
        }
    }).then(results => results.data.insertId)
}

async function UploadTag(tag, token: string) {
    console.log(tag)
    await axios.post(BackendURL + "/api/tagdescriptions", { description: tag.descID }, {
        headers: {
            'Authorization': 'JWT ' + token
        }
    }
    ).then(
        async (res) => {
            tag.descID = res.data.insertId
            console.log(tag)
            await axios.post(BackendURL + "/api/cointags", tag, {
                headers: {
                    'Authorization': 'JWT ' + token
                }
            }
            )
        }
    )
}

async function GetUserCoins(token,UID):Promise<Coin[]> {
    let tags = await axios.get(BackendURL+'/api/tags').then(res=>res.data) as Promise<TagInterface[]>;
    let coins = await Get(token, "coins", "userID", UID) as Promise<Coin[]>;
    return await Promise.all([coins, tags]).then(res=>{
        return res[0].map(e=>{
            return {
                ...e,
                tags: res[1].filter(g=>g.coinID==e.ID).map(h=>{
                    return {
                        ID: h.ID,
                        coinID: h.coinID,
                        description: h.description,
                        name: h.name,
                        color: h.color
                    }
                })
            }
        })
    });
}

export { GetTagTypes, UploadCoin, UploadTag, GetCoin,GetUserCoins }