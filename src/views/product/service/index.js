import axios from "axios";
let url = "http://127.0.0.1:8000/api/product/category";
let urlStore = "http://127.0.0.1:8000/api/product";
let urlProduct = "http://127.0.0.1:8000/api/product-all/";

class Product {
  async getCategory() {
    const data = axios.post(url).then((response) => {
      return response.data;
    });
    return data;
  }

  async insertProduct(params){
    const data = axios.post(urlStore,params).then((response) => {
      return response.data;
    });
    return data;

  }

  async getProduct(params){
    const data = axios.post(urlProduct,params).then((response) => {
      return response.data;
    });
    return data;
  }
  
}
export default new Product();
