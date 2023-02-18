import axios from "axios";
import type { TagInterface, TagType } from "../interfaces/Tags";
import { BackendURL } from "../stores";

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

async function UploadCoin(Coin, token: string) {
    return await axios.post(BackendURL + "/api/coins", Coin, {
        headers: {
            'Authorization': 'JWT ' + token
        }
    }).then(results => results.data.insertId)
}

async function UploadTag(tag, token: string) {
    await axios.post(BackendURL + "/api/tagdescriptions", { description: tag.descriptionID }, {
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

export { GetTagTypes, UploadCoin, UploadTag }