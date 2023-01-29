import axios from "axios";
let url = "http://127.0.0.1:8000/api/product-invoice";
class Invoice {
  async getProduct() {
    const data = axios.post(url).then((response) => {
      return response.data;
    });
    return data;
  }
}
export default new Invoice();
