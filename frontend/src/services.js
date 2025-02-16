import axios from 'axios'

const URl = 'http://localhost:5000/api'

const registernewuser = async (data) => {
  return await axios.post(`${URl}/register`, data)
}

const login = async (data) => {
  try {
    const response = await axios.post(`${URl}/login`, data)

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      console.log('Token Stored in LocalStorage:', response.data.token)
    } else {
      console.error('No token received in login response')
    }

    return response
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message)
    throw error
  }
}

const getexam = async () => {
  return await axios.get(`${URl}/getexam`)
}

const uploadexam = async (data) => {
  return await axios.post(`${URl}/uploadstudentanswersheet`, data)
}

const addexam = async (examData) => {
  const token = localStorage.getItem('token')
  console.log('Retrieved Token:', token)

  if (!token) {
    console.error('No token found in localStorage')
    throw new Error('No token found. Please log in.')
  }

  try {
    const response = await axios.post(
      'http://localhost:5000/api/add-exam',
      examData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )

    return response.data
  } catch (error) {
    console.error('Error in addexam:', error.response?.data || error.message)
    throw error
  }
}

const getUser = async (id) => {
  return await axios.get(`${URl}/getuser/${id}`)
}

const getstudentpaper = async (studentid) => {
  return await axios.get(`${URl}/getstudentpaper/${studentid}`)
}

const deleteExam = async (id) => {
  return await axios.delete(`${URl}/deleteexam/${id}`)
}

const getExamById = async (id) => {
  try {
    const response = await axios.get(`${URl}/getexam/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching exam:', error)
    throw error
  }
}

const updateExam = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${URl}/editexam/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error updating exam:', error)
    throw error
  }
}

export {
  registernewuser,
  login,
  getexam,
  uploadexam,
  addexam,
  getstudentpaper,
  deleteExam,
  getExamById,
  updateExam,
  getUser,
}
