export interface Topic {
    ID:number;
    name:string;
    posts:Array<Post>;
}

export interface Comment{
    userID:number;
    username:string;
    message:string;
    date:string;
}
export interface Post{
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