import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExamById, updateExam } from './services'

function EditExam() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [exam, setExam] = useState({ name: '', subject: '', date: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      setError('Invalid Exam ID')
      setLoading(false)
      return
    }

    async function fetchExam() {
      try {
        setLoading(true)
        const response = await getExamById(id)

        console.log('Full API Response:', response)

        if (
          response &&
          response.data &&
          response.data.success &&
          response.data.exam
        ) {
          const examData = response.data.exam

          // Format date properly for input type="date"
          const formattedDate = examData.date
            ? new Date(examData.date).toISOString().split('T')[0]
            : ''

          setExam({ ...examData, date: formattedDate })
          setError('') // Clear any previous errors
        } else {
          setError('Exam not found.')
        }
      } catch (error) {
        console.error('Fetch error:', error)
        setError('Error fetching exam.')
      } finally {
        setLoading(false)
      }
    }

    fetchExam()
  }, [id])

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateExam(id, exam)
      alert('Exam updated successfully!')
      navigate('/admin/home')
    } catch (error) {
      console.error('Update error:', error)
      alert('Error updating exam.')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className='edit-exam-container'>
      <h2>Edit Exam</h2>
      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type='text'
              name='name'
              value={exam.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Subject:
            <input
              type='text'
              name='subject'
              value={exam.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type='date'
              name='date'
              value={exam.date}
              onChange={handleChange}
              required
            />
          </label>
          <button type='submit'>Update Exam</button>
        </form>
      )}
    </div>
  )
}

export { EditExam }
