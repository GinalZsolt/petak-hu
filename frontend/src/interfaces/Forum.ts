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
    commentsAmount: number;
}
export interface Topic{
    ID:number;
    name:string;
}