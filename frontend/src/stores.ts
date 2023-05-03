import { writable, readable, type Readable, type Writable } from "svelte/store";
import type { Permission } from "./services/permissionGetter";
import type { URL } from "./interfaces/URL";
export let userPerms:Writable<Permission> = writable();
export let Token = writable(sessionStorage.getItem('petakhu')?JSON.parse(sessionStorage.getItem('petakhu')):"");
export let BackendURL = "http://localhost:8080";
export const Routes:Readable<URL[]> =  readable([
 {
   url:'/',
   name:'Promóciós oldal',
   minPermission: 0,
   component:'Promo',
   showInNavbar: false
 },
   {
    url:"/dashboard",
    name:"Főoldal",
    minPermission:1,
    component:'Dashboard',
    showInNavbar: true
 },
 {
    url:'/auctions',
    name:'Aukciók',
    minPermission:0,
    component: 'Auctions',
    showInNavbar: true
 },
 {
    url:'/admin',
    name:'Admin',
    minPermission:2,
    component: 'Admin',
    showInNavbar: true
 },
 {
    url:'/forums',
    name:'Fórumok',
    minPermission:1,
    component: 'Forum/Forum',
    showInNavbar: true
 },
 {
    url:'/forums/:id',
    name: 'Fórum bejegyzés',
    minPermission: 1,
    component: 'Forum/BlogPost',
    showInNavbar: false
 },
 {
    url:"/profile/:id",
    name: 'Egyéni profil',
    minPermission: 0,
    component: 'Profil',
    showInNavbar: false,
 },
 {
    url:'/auctions/:id',
    name: 'Egyéni aukció',
    minPermission: 0,
    component: 'AuctionPage',
    showInNavbar: false
 },
 {
    url: '/profilemod',
    name: 'Profilmódosítás',
    minPermission: 1,
    component: 'Profilmod',
    showInNavbar: false
 },
 {
    url: '/catalogue/:id',
    name: 'Katalógus',
    minPermission: 0,
    component: 'Catalogue',
    showInNavbar: false
 }
]) as Readable<URL[]>;