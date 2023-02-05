import axios from "axios";

const API_URL = "http://localhost:8081/auth";

class AuthService {
  
  login(username, password) {
    return axios
      .post(API_URL.concat("/login"), { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  } 

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, username, password) {
    return axios.post(API_URL, {
      name,
      email,
      username,
      password,
    });
  }
}

export default new AuthService();
