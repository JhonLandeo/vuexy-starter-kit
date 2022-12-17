import axios from "axios";
let url = "http://127.0.0.1:8000/api/client/";

class Client {
  async getClient() {
    const data = axios.get(url).then((response) => {
      return response.data;
    });
    return data;
  }
  async deleteClient(id) {
    const data = axios.delete(url + id).then(() => {
      this.getClient();
    });
    return data;
  }
  async postClient(parametros) {
    const data = axios.post(url, parametros).then(() => {
      this.getClient();
    });
    return data;
  }
  async putClient(id, parametros){
    const data = axios.put(url+id, parametros).then(()=>{
        this.getClient();
    })
    return data;
  }
}
export default new Client();
