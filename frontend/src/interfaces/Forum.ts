export interface Forum {
    ID:number;
    name:string;
    posts:Array<ForumPost>;
}
export interface ForumPost{
    postID:number;
    userID:number;
    title:string;
    username:string;
    startingdate:string;
    isClosed:boolean;
}
export interface Topic{
    ID:number;
    name:string;
}
export interface uploadData{
    title?:string;
    description?:string;
    topicID?:number;
    file?:File;
}