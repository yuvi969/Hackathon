import { useEffect, useState } from 'react'
import { getstudentpaper, getUser } from './services'
import './studenthome.css'

function Studenthome() {
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [studentName, setStudentName] = useState('')
  const [studentId, setStudentId] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      const storedUserId = localStorage.getItem('userId')
      if (!storedUserId) {
        setError('User ID not found. Please log in.')
        setLoading(false)
        return
      }

      try {
        setStudentId(storedUserId)
        const userResponse = await getUser(storedUserId)

        setStudentName(userResponse.data.name || 'Student')

        fetchPapers(storedUserId)
      } catch (error) {
        console.error('Error fetching user:', error)
        setError('Failed to retrieve user details.')
        setLoading(false)
      }
    }

    async function fetchPapers(userId) {
      try {
        const paperResponse = await getstudentpaper(userId)

        if (paperResponse.data.success) {
          setPapers(paperResponse.data.papers)
        } else {
          setError('No checked answer sheets found.')
        }
      } catch (error) {
        console.error('Error fetching papers:', error)
        setError('Error fetching data.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
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
          <h2 className='account'>Account</h2>
        </div>
      </header>

      <div className='welcome-section'>
        <h1 className='welcome-text'>Hi, {studentName}!</h1>
        <hr className='underline' />
      </div>

      <div className='papers-section'>
        <h2>Your Checked Answer Sheets</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='error'>{error}</p>
        ) : (
          <div className='papers-list'>
            {papers.map((paper) => (
              <div key={paper._id} className='paper-card'>
                <h3>Exam ID: {paper.examId}</h3>
                <p>
                  Submitted on: {new Date(paper.submittedAt).toLocaleString()}
                </p>
                <a
                  href={`http://localhost:5000/${paper.filePath.replace(
                    /\\/g,
                    '/'
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { Studenthome }
