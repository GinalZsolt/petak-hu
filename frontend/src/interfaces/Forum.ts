export interface Topic {
    ID:number;
    name:string;
    posts?:Array<Post>;
}
export interface uploadData{
    description?:string,
    title?:string,
    topicID:number,
    file?:FileList
}
export interface Comment{
    userID:number;
    username:string;
    message:string;
    date:string;
}
export interface Post{
    ID:number;
    topicID:number;
    userID:number;
    username:string;
    imagefile?:string;
    title:string;
    description:string;
    date:string;
    comments:Array<Comment>
    isClosed:boolean;
    isDeleted:boolean;
}