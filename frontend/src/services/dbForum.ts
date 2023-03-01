import type { BlogPost, Comment } from "../interfaces/Blogpost";
import type { Forum, Topic, ForumPost } from "../interfaces/Forum";
import { Get, Post, Delete, Patch } from "./dbQueries";

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
const db = {
    GetForums, GetBlogpost, GetTopics, GetTopic, UploadPost, GetPostsComments, UploadComment, DeletePost, ClosePost
}
export {db};