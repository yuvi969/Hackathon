import { useState, useEffect } from 'react'
import { uploadexam } from './services'
import { getexam } from './services'

function UploadAnswerSheet() {
  const [examId, setExamId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [exams, setExams] = useState([])

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await getexam()
        setExams(response.data.exams)
      } catch (error) {
        setMessage('Failed to load exams.')
      }
    }

    fetchExams()
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file || !examId || !studentName) {
      setMessage('Please fill in all fields!')
      return
    }

    const formData = new FormData()
    formData.append('examId', examId)
    formData.append('studentName', studentName)
    formData.append('answerSheet', file)

    try {
      await uploadexam(formData)
      setMessage('File uploaded successfully!')
    } catch (error) {
      setMessage(
        'Upload failed! ' +
          (error.response?.data?.message || 'Try again later.')
      )
    }
  }

  return (
    <div>
      <h2>Upload Student Answer Sheet</h2>
      <form onSubmit={handleSubmit}>
        <label>Exam:</label>
        <select
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          required
        >
          <option value=''>Select an Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.name} - {exam.subject}
            </option>
          ))}
        </select>

        <label>Student Name:</label>
        <input
          type='text'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <label>Upload PDF:</label>
        <input
          type='file'
          accept='application/pdf'
          onChange={handleFileChange}
          required
        />

        <button type='submit'>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default UploadAnswerSheet
