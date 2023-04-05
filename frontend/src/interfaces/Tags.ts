export interface TagInterface{
    ID?:number;
    coinID:number;
    descID?:number;
    description:string;
    name:string;
    color:string;
    categoryID?:number;
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

export interface Category{
    ID:number,
    name:string,
    color:string
}