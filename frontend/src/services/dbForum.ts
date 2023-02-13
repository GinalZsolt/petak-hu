import { BackendURL, Token } from "../stores";
import type { Forum, Topic, ForumPost } from "../interfaces/Forum";
import axios from "axios";

let url = "http://localhost:8080/api";

async function GetForums(token:string, topicid:number):Promise<ForumPost[]>{
    return await axios.get(url+'/forums/ID/'+topicid, {
        headers:{
            'Authorization': 'JWT '+token
        }
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response;
    })
}
async function GetTopics(token:string):Promise<Topic[]>{
    return await axios.get(url+'/topics', {
        headers:{
            "Authorization":'JWT '+token
        }
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response;
    })
}
async function GetTopic(token:string, topicid:number):Promise<Topic>{
    return await axios.get(url+'/topics/ID/'+topicid, {headers: {'Authorization':'JWT '+token}}).then(res=>res.data[0]).catch(err=>err.response);
}

const db = {
    GetForums, GetTopics, GetTopic
}
export {db};