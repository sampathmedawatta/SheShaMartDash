import axios from "axios";

const API_URL = "https://reqres.in";

const login = (username, password) => {
  return axios
    .get(API_URL + "/api/users/2", { // meka POST yawanne but api eke hatiyata wenas wenawa
      // username, // methana login data yawanna one with headers api eken ekata wenas wenawa
      // password,
    })
    .then((response) => {
      if(response.data.data.email === 'janet.weaver@reqres.in'){ // testing walata hardcode kalaa meka 200 enna one api eken
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => { // user log out una kiyala api ekata yawanna one methanin
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")); // log wela inna user ge data ganna one unaama
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
