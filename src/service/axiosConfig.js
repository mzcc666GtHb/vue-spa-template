import axios from 'axios'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'
import { assert } from '@/utils/tools'
import API_CONFIG from '@/service/apiConfig'

const AXIOS_DEFAULT_CONFIG = {
  baseURL:'/api',
  timeout: 20000,
  headers: {}
}

let axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

const API_DEFAULT_CONFIG = {
  debug: true,
  sep: '/'
}


class MakeApi {
  constructor(options) {
    this.api = {}
    this.apiBuilder(options)
  }
  apiBuilder({
               sep = '|',
               config = {},
               debug = false,
             }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }
  _apiSingleBuilder({
                      namespace,
                      sep = '|',
                      config = {},
                      debug = false,
                    }) {
    config.forEach( api => {
      const {name, method,params, path } = api
      let apiname = `${namespace}${sep}${name}`,
          url = path
      debug && assert(name, `${url} :接口name属性不能为空`)
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)
      Object.defineProperty(this.api, apiname, {
        value(outerParams, outerOptions) {
          let _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params))
          return axiosInstance(_normoalize(_assign({
            url,
            method
          }, outerOptions), _data))
        }
      })
    })
  }
}

function _normoalize(options, data) {
  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
