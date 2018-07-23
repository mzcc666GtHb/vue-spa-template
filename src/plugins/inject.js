import axios from  '@/service/axiosConfig'
export default  {
    install: (Vue, options) => {
      Vue.prototype.$http = axios
  }
}
