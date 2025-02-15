import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getexam, deleteExam } from './services'

function AdminHome() {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchExams() {
      try {
        setLoading(true)
        const response = await getexam()
        if (response.data.success && Array.isArray(response.data.exams)) {
          setExams(response.data.exams)
        } else {
          setError('Unexpected API response format.')
        }
      } catch (error) {
        setError('Error fetching exams.')
      } finally {
        setLoading(false)
      }
    }
    fetchExams()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteExam(id)
        setExams((prev) => prev.filter((exam) => exam._id !== id))
      } catch (error) {
        alert('Error deleting exam.')
      }
    }
  }

  return (
    <div className='admin-container'>
      <header className='admin-header'>
        <div className='account-section'>
          <img className='profile-img' src='profile-image-url' alt='Profile' />
          <Link to={'/admin/home/account'} className='account-link'>
            <h2 className='account'>Account</h2>
          </Link>
        </div>
      </header>

      <div className='welcome-section'>
        <h1 className='welcome-text'>Hi, Admin!</h1>
        <hr className='underline' />
      </div>

      <div className='exams-section'>
        <h2 className='subheading'>Your Exams ({exams.length})</h2>

        {loading ? (
          <p>Loading exams...</p>
        ) : error ? (
          <p className='error'>{error}</p>
        ) : exams.length > 0 ? (
          <div className='exams-container'>
            {exams.map((exam) => (
              <div key={exam._id} className='exam-card'>
                <h3>{exam.name}</h3>
                <p>
                  <strong>Subject:</strong> {exam.subject}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(exam.date).toLocaleDateString()}
                </p>
                <div className='exam-actions'>
                  <Link to={`/admin/home/editexam/${exam._id}`}>
                    <button className='edit-btn'>Edit</button>
                  </Link>
                  <button
                    className='delete-btn'
                    onClick={() => handleDelete(exam._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No exams available</p>
        )}

        <Link to={'/admin/home/add-exam'}>
          <button className='adminhomebutton'>
            <img
              src='https://s3-alpha-sig.figma.com/img/d2f3/2086/32585652aed0b202f00275e53c0a67d9?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZdB6aIpvFbgL5Ff35GjN6ZTkMXJDACYJvvw9LxxC5q9s-PLBIeh~G-mE5JtFnGFJB8LHAQLu8U-spGYIG3tGOyrZk~tNIxrTXcoY1FZ3birxup4gy3QXY4ZgAatjaXAIcpMx7BpJWVbl~Yz-OsCr70Z0j9u5n7n5DyW5U74cpKkAPf2Q4MlEJTBzU6KVe4vZpS8lWUtawJYZgOn4~PtBM~1Rnq81dtEnQIC3mlaDO37UeqsB4eK4qiN36BBIPJImESi4WPI6XqTYvuvhcpu5VvY3~jOHbfT9frCgYvnFvL8JcBWf-DBkbMYnyr4ALPz8pzzIFeVi1eygAViW9QXgcg__'
              className='plus-img'
              alt='plus-img'
            />
            Add Exam
          </button>
        </Link>

        <Link to='/admin/home/uploadans' className='add-subject-btn'>
          <button className='adminhomebutton'>
            <img
              src='https://s3-alpha-sig.figma.com/img/d2f3/2086/32585652aed0b202f00275e53c0a67d9?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZdB6aIpvFbgL5Ff35GjN6ZTkMXJDACYJvvw9LxxC5q9s-PLBIeh~G-mE5JtFnGFJB8LHAQLu8U-spGYIG3tGOyrZk~tNIxrTXcoY1FZ3birxup4gy3QXY4ZgAatjaXAIcpMx7BpJWVbl~Yz-OsCr70Z0j9u5n7n5DyW5U74cpKkAPf2Q4MlEJTBzU6KVe4vZpS8lWUtawJYZgOn4~PtBM~1Rnq81dtEnQIC3mlaDO37UeqsB4eK4qiN36BBIPJImESi4WPI6XqTYvuvhcpu5VvY3~jOHbfT9frCgYvnFvL8JcBWf-DBkbMYnyr4ALPz8pzzIFeVi1eygAViW9QXgcg__'
              className='plus-img'
              alt='Add'
            />
            <span>Upload Answersheet</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export { AdminHome }
