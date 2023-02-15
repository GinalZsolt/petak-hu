import { writable, readable, type Readable, type Writable } from "svelte/store";
import type { Permission } from "./services/permissionGetter";
import type { URL } from "./interfaces/URL";
import Chat from './components/Chat.svelte';
import Login from "./components/Login.svelte";
import Dashboard from "./components/Dashboard.svelte";
import Auctions from "./components/Auctions.svelte";
import Registration from "./components/Registration.svelte";
import Forum from "./components/Forum/Forum.svelte";
export let userPerms:Writable<Permission> = writable();
export let Token = writable(sessionStorage.getItem('petakhu')?JSON.parse(sessionStorage.getItem('petakhu')):"");
export let BackendURL = "http://localhost:8080";
export const Routes:Readable<URL[]> =  readable([
 {
    url:"/",
    name:"Főoldal",
    minPermission:1,
    component:Dashboard
 },
 {
    url:'/auctions',
    name:'Aukciók',
    minPermission:0,
    component:Auctions
 },
 {
    url:'/chat',
    name:'Chat',
    minPermission:1,
    component:Chat
 },
 {
    url:'/admin',
    name:'Admin',
    minPermission:2,
    component:Dashboard
 },
 {
    url:'/forums',
    name:'Fórumok',
    minPermission:1,
    component:Forum
 }
]) as Readable<URL[]>;