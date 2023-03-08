import axios from 'axios';
import type { BlogPost, Comment } from "../interfaces/Blogpost";
import type { Topic } from "../interfaces/Forum";
import { Get, Post, Patch } from "./dbQueries";

export interface dbPost{
    topicID:number;
    userID:number;
    imagefile?:string;
    title:string;
    description:string;
}



async function GetForums(token:string):Promise<Topic[]>{
    let topics = await axios.get('http://localhost:8080/api/topics', {headers:{'Authorization':"JWT "+token}});
    let posts = await axios.get('http://localhost:8080/api/posts', {headers:{'Authorization':"JWT "+token}});
    let comments = await axios.get('http://localhost:8080/api/comments', {headers:{'Authorization':"JWT "+token}});
    return Promise.all([topics, posts, comments]).then(res=>res).catch(err=>err.response)





    //return await [] as Topic[];
}





async function GetBlogpost(token:string, postid:number):Promise<BlogPost>{
    return await Get(token, 'posts', 'ID', postid) as Promise<BlogPost>;
}
async function GetTopic(token:string, topicid:number):Promise<Topic>{
    return await Get(token, 'topics', 'ID', topicid);
}
async function UploadPost(token:string, data:dbPost){
    return await Post(token, 'posts', data);
}
async function UploadComment(token:string, data:Comment){
    return await Post(token, 'comments', data);
}
async function GetPostsComments(token:string, postID:number):Promise<Comment[]>{
    return await Get(token, 'postcomments', 'postID', postID);
}
async function DeletePost(token:string, postID:number){
    return await Patch(token, 'posts', 'ID', postID, {
        isDeleted: 1  
    });
}
async function ClosePost(token:string, postID:number){
    return await Patch(token, 'posts', 'ID', postID, {
        isClosed: 1
    });
}
async function MailPost(token:string, postID:number){
    return await Patch(token, 'posts', 'ID', postID, {
        notified: 1
    });
}
const db = {
    GetForums, GetBlogpost, GetTopic, UploadPost, GetPostsComments, UploadComment, DeletePost, ClosePost, MailPost
}
export {db};