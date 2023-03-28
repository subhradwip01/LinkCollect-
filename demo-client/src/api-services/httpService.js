import axios from "axios";

// For server internal error handling status-code(500)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("An unexpected error occured");
  }

  return Promise.reject(error);
});

// ----------- Setting JWT token on every request ------------ //
function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

function init() {
  const token = localStorage.getItem("token");
  if (token) {
    setJwt(token);
  }
}

init();

// Please use http.get,post....instead of using axios everywhere
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
