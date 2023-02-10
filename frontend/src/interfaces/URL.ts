import type { ComponentType } from "svelte/internal";
export interface URL{
    url:string;
    name:string;
    minPermission:number;
    component:ComponentType
    children?:Array<URL>;
}