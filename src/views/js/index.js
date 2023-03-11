import axios from "axios";
let url = "http://127.0.0.1:8000/api/register/";
let urlLogin = "http://127.0.0.1:8000/api/login/";

class General {
  async register(params) {
    const data = axios.post(url,params).then((response) => {
      return response.data;
    });
    return data;
  }
  async login(params) {
    const data = axios.post(urlLogin,params).then((response) => {
      return response.data;
    });
    return data;
  }
}
export default new General();
