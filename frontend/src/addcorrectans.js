import { useState } from 'react'
import { addexam } from './services'
import './addexam.css'

function AddExam() {
  const [subject, setSubject] = useState('')
  const [questions, setQuestions] = useState([
    { question: '', keyValues: [{ key: '', value: '', maxMarks: '' }] },
  ])
  const [message, setMessage] = useState('')

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
      await addexam({ subject, questions })
      setMessage('Exam added successfully!')
      setSubject('')
      setQuestions([
        { question: '', keyValues: [{ key: '', value: '', maxMarks: '' }] },
      ])
    } catch (error) {
      console.error(error)
      setMessage('Error adding exam.')
    }
  }

  return (
    <div className='add-exam-container'>
      <h2 className='add-exam-title'>Add New Exam</h2>
      <form className='add-exam-form' onSubmit={handleSubmit}>
        <label className='exam-label'>Subject Name:</label>
        <input
          type='text'
          className='exam-input'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <h3 className='questions-title'>
          Enter Questions with Key-Value Pairs and Max Marks:
        </h3>
        {questions.map((q, qIndex) => (
          <div className='question-container' key={qIndex}>
            <input
              type='text'
              className='question-input'
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder='Enter question'
              required
            />
            {q.keyValues.map((kv, kvIndex) => (
              <div className='key-value-pair' key={kvIndex}>
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
                  className='add-kv-btn'
                  onClick={() => addKeyValuePair(qIndex)}
                >
                  Add More Key-Value
                </button>
              </div>
            ))}
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
          Submit
        </button>
      </form>
      {message && (
        <p
          className={
            message.includes('Error') ? 'error-message' : 'success-message'
          }
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default AddExam
