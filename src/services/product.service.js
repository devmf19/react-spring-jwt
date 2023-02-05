import axios from "axios";

const API_URL = "http://localhost:8081/products";

class ProductService {

    list() {
        return axios
            .get(API_URL)
            .then((response) => {
                return response.data;
            });
    }


    // login(username, password) {
    //     return axios
    //     .post(API_URL.concat("/login"), { username, password })
    //     .then((response) => {
    //         if (response.data.token) {
    //         localStorage.setItem("user", JSON.stringify(response.data));
    //         }

    //         return response.data;
    //     });
    // } 

    // logout() {
    //     localStorage.removeItem("user");
    // }

    register(name, price) {
        return axios.post(API_URL, {
            name,
            price
        });
    }
}

export default new ProductService();