
import axios from "axios";
const API_URL = "https://nameismani-jobfinder.onrender.com/api-v1/"

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
    withCredentials: true, 
});

export const apiRequest = async({url,token,data,method})=>{

    try{
        const result = await API(url,{
            method:method || "GET",
            data:data,
            headers:{
                "content-type":"application/json",
                Authorization: token ? `Bearer ${token}`:""
            }
        })
        // console.log(result)
        return result
    }catch(err){
        console.log(err)
    }
}

export const handleFileUpload = async(uploadFile)=>{
const formData = new FormData();
formData.append("file", uploadFile);
formData.append("upload_preset","jobfinder")

try{
    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/depk9nr1g/image/upload",formData);
    return response.data.secure_url;

}catch(err){
    console.log(err)
}
}

export const updateURL = ({pageNum,query,cmpLoc,sort,navigate,location,jType,exp})=>{
 const params = new URLSearchParams();

 if(pageNum && pageNum > 1){
    params.set('page',pageNum);
 }
 if(query){
    params.set('search', query);
 }

 if(cmpLoc){
    params.set("location",cmpLoc);
 }

 if(sort){
    params.set("sort",sort);
 }

 if(jType){
    params.set('jtype',jType);
 }

 if(exp){
    // console.log(exp)
    params.set("exp",exp)
 }

 const newURL = `${location.pathname}?${params.toString()}`;
 navigate(newURL,{replace:true})

 return newURL;
}