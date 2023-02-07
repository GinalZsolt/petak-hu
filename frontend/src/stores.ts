import { writable, readable } from "svelte/store";
import { User } from "./classes/User";
import Chat from './components/Chat.svelte';
import Login from "./components/Login.svelte";
import Dashboard from "./components/Dashboard.svelte";
import Forum from "./components/Forum/Forum.svelte";
import Auctions from "./components/Auctions.svelte";
import Registration from "./components/Registration.svelte";
import Catalogue from "./components/Catalogue.svelte";
interface URL{
    url:string;
    name:string;
    permission:number;
    component:any
    children?:Array<URL>;
}
export let LoggedInUser = writable();
export const Routes = readable([
    ({
        name:"Bejelentkezés",
        url:"/",
        permission:0,
        component:Login
    } as URL),
    ({
        name:"Regisztráció",
        url:"/register",
        permission:0,
        component:Registration
    } as URL),
    ({
        name:"Érmekatalógus",
        url:"/catalogue/:id",
        permission:0,
        component:Catalogue
    } as URL),
    ({
        name:"Aukciók",
        url:"/auctions",
        permission:0,
        component:Auctions
    } as URL),
    ({
        name:"Chat",
        url:"/chat",
        permission:1,
        component: Chat
    } as URL),
    ({
        name:"Fórum",
        url:"/forums",
        permission:1,
        component:Forum
    } as URL),
    ({
        name:"Főoldal",
        url:"/dashboard",
        permission:1,
        component:Dashboard
    } as URL),
    ({
        name:"Admin",
        url:"/admin",
        permission:2,
        component:Dashboard
    } as URL),
]);