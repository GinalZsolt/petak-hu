import type { BlogPost } from "../interfaces/Blogpost";
import type { Forum, Topic, ForumPost } from "../interfaces/Forum";
import { Get, Post, Delete } from "./dbQueries";

export interface dbPost{
    topicID:number;
    userID:number;
    imagefile?:string;
    title:string;
    description:string;
}


let url = "http://localhost:8080/api";
async function GetForums(token:string, topicid:number):Promise<ForumPost[]>{
    return await Get(token, 'forums', 'ID', topicid) as Promise<ForumPost[]>;
}
async function GetBlogpost(token:string, postid:number):Promise<BlogPost>{
    return await Get(token, 'posts', 'ID', postid) as Promise<BlogPost>;
}
async function GetTopics(token:string):Promise<Topic[]>{
    return await Get(token, 'topics');
}
async function GetTopic(token:string, topicid:number):Promise<Topic>{
    return await Get(token, 'topics', 'ID', topicid);
}
async function UploadPost(token:string, data:dbPost){
    return await Post(token, 'posts', data);
}
const db = {
    GetForums, GetBlogpost, GetTopics, GetTopic, UploadPost
}
export {db};