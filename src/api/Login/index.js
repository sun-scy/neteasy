import axios from './axios'
import api from './config'
import http from '../../utils/http'
export default http(axios,api.api)