import type { ComponentType } from "svelte";
import { writable, readable, type Readable } from "svelte/store";
import { User } from "./classes/User";
import type { URL } from "./interfaces/URL";
import Chat from './components/Chat.svelte';
import Login from "./components/Login.svelte";
import Dashboard from "./components/Dashboard.svelte";
import Auctions from "./components/Auctions.svelte";
import Registration from "./components/Registration.svelte";
import Forum from "./components/Forum/Forum.svelte";
import axios from "axios";

export let Permission = writable({});
export let Token = writable(sessionStorage.getItem('petakhu')?JSON.parse(sessionStorage.getItem('petakhu')):"");
export let BackendURL = readable("http://localhost:8080");
export const Routes:Readable<URL[]> =  readable([
 {
    url:"/",
    name:"Főoldal",
    minPermission:1,
    component:Dashboard
 },
 {
    url:"/login",
    name:"Bejelentkezés",
    minPermission:0,
    component:Login
 },
 {
    url:"/register",
    name:"Regisztráció",
    minPermission:0,
    component:Registration
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