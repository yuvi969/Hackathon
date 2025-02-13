import axios from 'axios'

const URl = 'http://localhost:5000/api'

const registernewuser = async (data) => {
  return await axios.post(`${URl}/register`, data)
}

const login = async (data) => {
  return await axios.post(`${URl}/login`, data)
}

export { registernewuser, login }
