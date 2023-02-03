import axios from 'axios';
import { Value } from 'sass';

interface Params{
    url:string,
    id:number|undefined,
    field:string|undefined,
    value:string|number|undefined,
    data?
};

function CreateUrl(data:Params){
    switch (true){
        case data.field!==undefined||data.value!==undefined: return `${data.url}/${data.field}/${data.value}`;




    };
}
function GET(data:Params){

};
function POST(){

} 
function PATCH(){

}
function DELETE(){

}
const functions = {
    GET,
    POST,
    PATCH
}
export {functions};