import axios from "axios";
let url = "http://127.0.0.1:8000/api/category/";

class Category {
    async getCategory() {
        const data = axios.get(url).then((response)=>{
            return response.data;
        })
        return data;
    }
    async insertCategory(params){
        const data = axios.post(url, params).then(()=>{
            this.getCategory();
        })
        return data;
    }
}
export default new Category();