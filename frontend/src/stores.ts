import { writable, readable, type Readable, type Writable } from "svelte/store";
import type { Permission } from "./services/permissionGetter";
import type { URL } from "./interfaces/URL";
export let userPerms:Writable<Permission> = writable();
export let Token = writable(sessionStorage.getItem('petakhu')?JSON.parse(sessionStorage.getItem('petakhu')):"");
export let BackendURL = "http://localhost:8080";
export const Routes:Readable<URL[]> =  readable([
 {
    url:"/",
    name:"Főoldal",
    minPermission:1,
    component:'../components/Dashboard.svelte',
    showInNavbar: true
 },
 {
    url:'/auctions',
    name:'Aukciók',
    minPermission:0,
    component: '../components/Auctions.svelte',
    showInNavbar: true
 },
 {
    url:'/admin',
    name:'Admin',
    minPermission:2,
    component: '../components/Admin.svelte',
    showInNavbar: true
 },
 {
    url:'/forums',
    name:'Fórumok',
    minPermission:1,
    component: '../components/Forum/Forum.svelte',
    showInNavbar: true
 },
 {
    url:'/forums/:id',
    name: 'Fórum bejegyzés',
    minPermission: 1,
    component: '../components/Forum/BlogPost.svelte',
    showInNavbar: false
 },
 {
    url:"/profile/:id",
    name: 'Egyéni profil',
    minPermission: 0,
    component: '../components/Profil.svelte',
    showInNavbar: false,
 },
 {
    url:'/auctions/:id',
    name: 'Egyéni aukció',
    minPermission: 0,
    component: '../components/AuctionPage.svelte',
    showInNavbar: false
 },
 {
    url: '/profilemod',
    name: 'Profilmódosítás',
    minPermission: 1,
    component: '../components/Profilmod.svelte',
    showInNavbar: false
 },
 {
    url: '/catalogue/:id',
    name: 'Katalógus',
    minPermission: 0,
    component: '../components/Catalogue.svelte',
    showInNavbar: false
 }
]) as Readable<URL[]>;