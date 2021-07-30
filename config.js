module.exports = {
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  import axios from "axios";
  
  const instance = axios.create({
    // baseURL: 'http://localhost:3000/',
    xhrFields: {
        withCredentials: true
    },
    headers: {
        'Content-Type': "application/json;charset=UTF-8"
    }
  })
  // axios.interceptors.request.use(config => {
  //     // 在请求头中添加token
  //     config.headers["Content-type"] = "application/json;charset=UTF-d8";
  //     return config;
  // })
  axios.interceptors.request.use(
    config => {
        config.headers.Authorization = "bdta";//把localStorage的token放在Authorization里
        //  config.headers["Content-type"] = "application/json;charset=UTF-8";
        config.withCredentials = true;
        return config;
    },
    function (err) {
        console.log("失败信息" + err);
    }
  );
  
  