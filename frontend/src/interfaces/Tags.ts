export interface TagInterface{
    ID?:number;
    coinID:number;
    description:string;
    name:string;
    color:string;
    Category?:string;
}

export interface TagType{
    ID:number;
    name:string;
    color:string;
}

export interface TagDescription{
    ID:number;
    description:string;
}
