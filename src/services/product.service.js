import axios from "axios";

const API_URL = "http://localhost:8081/products";
const user = JSON.parse(localStorage.getItem('user'));

class ProductService {

    register(name, price) {
        return axios.post(
            API_URL, 
            {name,price},
            { headers: { Authorization: `Bearer ${user.token}` } }
        );
    }
}

export default new ProductService();