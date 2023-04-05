import axios from 'axios';
import type { BlogPost, Comment } from "../interfaces/Blogpost";
import type { Topic, Post as _post, Comment as _Comment } from "../interfaces/Forum";
import { Get, Post, Patch } from "./dbQueries";

export interface dbPost {
    topicID: number;
    userID: number;
    imagefile?: string;
    title: string;
    description: string;
}

interface dbTopic {
    ID: number;
    name: string;
}
interface _dbPost {
    ID: number;
    topicID: number;
    userID: number;
    imagefile: string | null;
    title: string;
    description: string;
    date: string;
    isClosed: boolean;
    isDeleted: boolean;
}
interface dbComment {
    ID: number;
    postID: number;
    userID: number;
    message: string;
    date: string;
}

async function GetForums(token: string): Promise<Topic[]> {
    let topics = await axios.get('http://localhost:8080/api/topics', { headers: { 'Authorization': "JWT " + token } }).then(res => res.data) as Promise<dbTopic[]>;
    let posts = await axios.get('http://localhost:8080/api/posts', { headers: { 'Authorization': "JWT " + token } }).then(res => res.data) as Promise<_dbPost[]>;
    let comments = await axios.get('http://localhost:8080/api/comments', { headers: { 'Authorization': "JWT " + token } }).then(res => res.data) as Promise<dbComment[]>;
    let users = await axios.get('http://localhost:8080/api/users').then(res => res.data) as {
        name: string,
        fullname: string,
        ID: number;
    }[];
    return Promise.all([topics, posts, comments, users]).then(res => {
        return res[0].map(e => {
            return {
                ID: e.ID,
                name: e.name,
                posts: res[1].map(g => {
                    return {
                        ID:g.ID,
                        userID: g.userID,
                        topicID:g.topicID,
                        username: res[3].find(user => user.ID == g.userID).name,
                        date: g.date,
                        isClosed: g.isClosed,
                        isDeleted: g.isDeleted,
                        title: g.title,
                        description: g.description,
                        imagefile: g.imagefile,
                        comments: res[2].map(h => {
                            return {
                                ID: h.ID,
                                date: h.date,
                                message: h.message,
                                userID: h.userID,
                                username: res[3].find(user => user.ID == h.userID).name
                            } as Comment
                        })
                    } as _post
                }).filter(n=>n.topicID==e.ID)
            } as Topic
        }) as Topic[];
    })





    //return await [] as Topic[];
}





async function GetBlogpost(token: string, postid: number): Promise<BlogPost> {
    return await Get(token, 'posts', 'ID', postid) as Promise<BlogPost>;
}
async function GetTopic(token: string, topicid: number): Promise<Topic> {
    return await Get(token, 'topics', 'ID', topicid);
}
async function UploadPost(token: string, data: dbPost) {
    return await Post(token, 'posts', data);
}
async function UploadComment(token: string, data: Comment) {
    return await Post(token, 'comments', data);
}
async function GetPostsComments(token: string, postID: number): Promise<Comment[]> {
    return await Get(token, 'postcomments', 'postID', postID);
}
async function DeletePost(token: string, postID: number) {
    return await Patch(token, 'posts', 'ID', postID, {
        isDeleted: 1
    });
}
async function ClosePost(token: string, postID: number) {
    return await Patch(token, 'posts', 'ID', postID, {
        isClosed: 1
    });
}
async function MailPost(token: string, postID: number) {
    return await Patch(token, 'posts', 'ID', postID, {
        notified: 1
    });
}
const db = {
    GetForums, GetBlogpost, GetTopic, UploadPost, GetPostsComments, UploadComment, DeletePost, ClosePost, MailPost
}
export { db };