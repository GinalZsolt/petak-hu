import type { Coin } from "../interfaces/Coin";
import type { Auction } from "../interfaces/Auction";
import axios from 'axios';

export interface Statistics{
    title:string,
    value:number,
    date:string
}






export async function getCoinWorthStats(token:string):Promise<Statistics[]>{
    return await axios.get('http://localhost:8080/api/coins',{
        headers:{'authorization': 'JWT '+token}
    }).then(res=>{
        let dates: string[] = Array.from(new Set((res.data as Array<Coin>).map(t=>t.uploadDate)));
        let worths = (res.data as Array<Coin>).map(e=>{ return {worth: e.worth, date:e.uploadDate}});
        return dates.map(z=>{
            return {
                date:z,
                value: worths.filter(g=>g.date==z).map(t=>t.worth).reduce((a,b)=>a+b),
                title:"Zsetonok értéke"
            }
        })
    })
}
export async function getCoinAmountStats(token:string):Promise<Statistics[]>{
    return await axios.get('http://localhost:8080/api/coins',{
        headers:{'authorization': 'JWT '+token}
    }).then(res=>{
        let dates: string[] = Array.from(new Set((res.data as Array<Coin>).map(t=>t.uploadDate)));
        return dates.map(e=>{
            return {
                date:e,
                value: (res.data as Coin[]).filter(z=>z.uploadDate==e).length,
                title:"Zsetonok száma"
            }
        })        
    });
}