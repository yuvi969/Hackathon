import { useState } from 'react'

function Createacc() {
  const [formdata, setformdata] = useState({
    email_id: '',
    password: '',
    confirmpassword: '',
  })

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  function handlesubmit(e) {
    e.preventDefault()
    console.log('Form submitted:', formdata)
  }

  return (
    <>
      <div className='createaccdiv'>
        <h1 className='createaccheader'>Create Account</h1>
        <form className='create-new-form' onSubmit={handlesubmit}>
          <input
            type='email'
            name='email_id'
            placeholder='Email ID'
            value={formdata.email_id}
            onChange={handlechange}
            required
          />
          <input
            type='password'
            name='password'
            value={formdata.password}
            placeholder='Password'
            onChange={handlechange}
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmpassword'
            value={formdata.confirmpassword}
            onChange={handlechange}
            required
          />
          <button type='submit' className='signupbutton'>
            Sign up
          </button>
        </form>
      </div>
    </>
  )
}

export { Createacc }
