import axios from 'axios';

/*
const api = axios.create({
    baseURL: 'http://localhost:8080'
});
*/

class CustomApi {
    
    get(url:String){
        
        return new Promise((resolve, reject) => {

            return resolve();
        })
    }
}

const api = new CustomApi();

export default api