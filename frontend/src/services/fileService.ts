
import axios from "axios";

interface FileInfo{
  fieldname?:string;
  originalname?:string;
  encoding?:string;
  mimetype?:string;
  destination?:string
  filename?:string
  size?:number;
}

async function UploadImage(token:string, data:FormData):Promise<FileInfo>{
    return axios.post('http://localhost:8080/api/file/single', data, {
        headers:{
            'Content-Type':'multipart/form-data',
            'Authorization': 'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response);
}


export {UploadImage}