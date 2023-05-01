
import axios from "axios";

interface FileInfo{
  fieldname?:string;
  originalname?:string;
  encoding?:string;
  mimetype?:string;
  destination?:string
  filename?:string
  size?:number;
  code?:string;
}

async function UploadImage(token:string, data:FormData):Promise<FileInfo>{
    return axios.post('http://localhost:8080/api/file/single', data, {
        headers:{
            'Content-Type':'multipart/form-data',
            'Authorization': 'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response.data);
}
async function DeleteImage(token:string, filename:string){
    return axios.delete('http://localhost:8080/api/file/single/'+filename, {headers:{'Authorization': "JWT " + token}}).then(res=>res.data).catch(err=>err);
}
async function UploadImages(token:string, data:FormData):Promise<{
    head: FileInfo[],
    tail:FileInfo[],
    code?:string
}>{
    return axios.post('http://localhost:8080/api/file/multiple', data, {
        headers:{
            'Content-Type':'multipart/form-data',
            'Authorization': 'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response.data);
}
export {UploadImage, UploadImages, DeleteImage}