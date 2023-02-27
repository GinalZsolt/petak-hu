export interface BlogPost{
    title:string;
    description:string;
    imagefile:string;
    date:string;
    isClosed:boolean;
    topicID:number;
    userID:number;
    ID:number;
}
export interface Comment{
    ID:number;
    postID:number;
    userID:number;
    username:string;
    message:string;
    date:string;
}