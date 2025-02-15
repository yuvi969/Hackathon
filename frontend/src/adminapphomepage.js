import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getexam } from './services'

function AdminHome() {
  const [exams, setExams] = useState([])

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await getexam()
        console.log('API Response:', response)
        if (response.data.success && Array.isArray(response.data.exams)) {
          setExams(response.data.exams)
        } else {
          console.error('Unexpected API response format:', response.data)
        }
      } catch (error) {
        console.error('Error fetching exams:', error)
      }
    }
    fetchExams()
  }, [])

  return (
    <div className='admin-container'>
      <header className='admin-header'>
        <div className='account-section'>
          <img
            className='profile-img'
            src='https://s3-alpha-sig.figma.com/img/e10e/febf/f4cca33f517e65ec1d5f085c783594a1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k-hAah9RVlf~afzPTSm52ZMD-2OLuCu07w8LFYIHZCIE~3dnUsbFefly9eK8HZSyyy4tSzr3sMSbrw~hrwh4Ao3waec5-j-sfZYeJ8xyw48oI2kpEwMSyo3sde34gQ5QLlVHA37fJEpZxmNkwXr-KJjrCfa7KP9Je4TOdcKeU~8miAGxEe5fqVpCE1YATVz-sXM8CYLiRlOwJULRMMIU5bOhrRfCJLz0rJzFXtecvttbCcPDJ9QAxFg23Cl~G-kA3P89Yhc9~lzJLZcWz34Z2Ap9NAlXrbSQgsyqnjiDXE3~TYNg~2yjy6ZdteOfD8BVy7IECN8JsqbU1KBE6Ul7~A__'
            alt='Profile'
          />
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
        <h2 className='subheading'>Your Exams:</h2>
        <div className='exams-container'>
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div key={exam._id} className='exam-card'>
                <h3>{exam.name}</h3>
                <p>
                  <strong>Subject:</strong> {exam.subject}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(exam.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No exams available</p>
          )}
        </div>

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
