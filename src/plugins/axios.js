import axios from "axios";
import { useStore } from "@/stores";

let targetUrl = "";
if (location.origin.includes("localhost:8080")) {
  targetUrl = `localhost:8080`;
} else {
  targetUrl = `localhost:8080`;
}

const instance = axios.create({
  baseURL: targetUrl,
  timeout: 10000,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const store = useStore();
    const token = store.accessToken;
    config.headers.accessToken = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.errorMessage !== undefined) {
      alert(response.data.errorMessage);
      // console.error("interceptors.response Message: ", response.data);
    }
    return response;
  },
  function (error) {
    alert("연결이 끊어졌습니다. 인터넷을 확인해보시고, 다시 접속해주세요");
    console.error("Network Error, Retry", error);
  }
);

export default instance;
