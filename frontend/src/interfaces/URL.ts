export interface URL{
    url:string;
    name:string;
    minPermission:number;
    component:string
    children?:Array<URL>;
    showInNavbar:boolean;
}