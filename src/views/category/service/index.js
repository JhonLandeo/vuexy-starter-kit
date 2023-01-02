import axios from "axios";
let url = "http://127.0.0.1:8000/api/category/";
let urlGet = "http://127.0.0.1:8000/api/categories/";
let deleteCategory = "http://127.0.0.1:8000/api/delete-category/";
let updateCategory = "http://127.0.0.1:8000/api/update-category/";

class Category {
    async getCategory(params) {
        const data = axios.post(urlGet, params).then((response) => {
            return response.data;
        })
        return data;
    }
    async insertCategory(params) {
        const data = axios.post(url, params).then(() => {
            this.getCategory();
        })
        return data;
    }
    async deleteCategory(params) {
        const data = axios.post(deleteCategory, params).then(() => {
            return data;
        })  
    }
    async updateCategory(params) {
        const data = axios.post(updateCategory, params).then(() => {
            return data;
        })
    }
}
export default new Category();