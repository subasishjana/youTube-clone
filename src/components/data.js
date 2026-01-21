 export const API_KEY = 'AIzaSyAi-4AkCBFTPvIZGecZBPpCSus5QG8wAUA';

  export const value_converter = (value)=>{
    if(value>=1000000)
    {
       return Math.floor(value/1000000)+"M"
    }
    else if(value){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
 }