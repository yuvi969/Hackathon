import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExamById, updateExam } from './services'
import './editexam.css'

function EditExam() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [subject, setSubject] = useState('')
  const [questions, setQuestions] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchExam() {
      try {
        setLoading(true)
        const response = await getExamById(id)

        if (response && response.exam) {
          setSubject(response.exam.subject || '')
          setQuestions(response.exam.questions || [])
        } else {
          setError('Exam not found.')
        }
      } catch (error) {
        console.error(error)
        setError('Error fetching exam.')
      } finally {
        setLoading(false)
      }
    }

    fetchExam()
  }, [id])

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].question = value
    setQuestions(updatedQuestions)
  }

  const handleKeyValueChange = (qIndex, kvIndex, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].keyValues[kvIndex][field] = value
    setQuestions(updatedQuestions)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', keyValues: [{ key: '', value: '', maxMarks: '' }] },
    ])
  }

  const addKeyValuePair = (qIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].keyValues.push({
      key: '',
      value: '',
      maxMarks: '',
    })
    setQuestions(updatedQuestions)
  }

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const deleteKeyValuePair = (qIndex, kvIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].keyValues = updatedQuestions[
      qIndex
    ].keyValues.filter((_, i) => i !== kvIndex)
    setQuestions(updatedQuestions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !subject ||
      questions.some(
        (q) =>
          !q.question ||
          q.keyValues.some((kv) => !kv.key || !kv.value || !kv.maxMarks)
      )
    ) {
      setMessage('Please fill in all fields!')
      return
    }

    try {
      await updateExam(id, { subject, questions })
      setMessage('Exam updated successfully!')
      navigate('/admin/home')
    } catch (error) {
      console.error(error)
      setMessage('Error updating exam.')
    }
  }

  if (loading) {
    return <p className='loading-text'>Loading...</p>
  }

  return (
    <div className='edit-exam-container'>
      <h2 className='edit-exam-title'>Edit Exam</h2>
      {error && <p className='error-message'>{error}</p>}
      <form className='edit-exam-form' onSubmit={handleSubmit}>
        <label className='exam-label'>Subject Name:</label>
        <input
          type='text'
          className='exam-input'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <h3 className='questions-title'>
          Edit Questions with Key-Value Pairs and Max Marks:
        </h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className='question-container'>
            <input
              type='text'
              className='question-input'
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder='Enter question'
              required
            />
            <button
              type='button'
              className='delete-question-btn'
              onClick={() => deleteQuestion(qIndex)}
            >
              Delete Question
            </button>

            {q.keyValues.map((kv, kvIndex) => (
              <div key={kvIndex} className='key-value-pair'>
                <input
                  type='text'
                  className='key-input'
                  value={kv.key}
                  onChange={(e) =>
                    handleKeyValueChange(qIndex, kvIndex, 'key', e.target.value)
                  }
                  placeholder='Key'
                  required
                />
                <input
                  type='text'
                  className='value-input'
                  value={kv.value}
                  onChange={(e) =>
                    handleKeyValueChange(
                      qIndex,
                      kvIndex,
                      'value',
                      e.target.value
                    )
                  }
                  placeholder='Value'
                  required
                />
                <input
                  type='number'
                  className='marks-input'
                  value={kv.maxMarks}
                  onChange={(e) =>
                    handleKeyValueChange(
                      qIndex,
                      kvIndex,
                      'maxMarks',
                      e.target.value
                    )
                  }
                  placeholder='Max Marks'
                  required
                />
                <button
                  type='button'
                  className='delete-kv-btn'
                  onClick={() => deleteKeyValuePair(qIndex, kvIndex)}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              type='button'
              className='add-kv-btn'
              onClick={() => addKeyValuePair(qIndex)}
            >
              Add More Key-Value
            </button>
          </div>
        ))}

        <button
          type='button'
          className='add-question-btn'
          onClick={addQuestion}
        >
          Add Another Question
        </button>
        <button type='submit' className='submit-exam-btn'>
          Update Exam
        </button>
      </form>
      {message && <p className='success-message'>{message}</p>}
    </div>
  )
}

export { EditExam }
