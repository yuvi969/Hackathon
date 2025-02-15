import { useState } from 'react'
import { registernewuser } from './services'
import { useNavigate } from 'react-router'

function Createacc() {
  const [formdata, setformdata] = useState({
    email: '',
    password: '',
    confirmpassword: '',
    name: '',
    role: '',
  })

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }
  const navigate = useNavigate()

  async function handlesubmit(e) {
    e.preventDefault()
    try {
      if (formdata.password === formdata.confirmpassword) {
        const { name, email, password, role } = formdata
        await registernewuser({ name, email, password, role })
        alert('New user created')
        navigate('/')
      } else {
        alert('Password does not match')
      }
    } catch (error) {
      console.log(error)
      alert('Operation failed')
    }
  }

  return (
    <>
      <div className='createaccdiv'>
        <h1 className='createaccheader'>Create Account</h1>
        <form className='create-new-form' onSubmit={handlesubmit}>
          <input
            type='text'
            name='name'
            placeholder='Enter your name'
            value={formdata.name}
            onChange={handlechange}
            required
          />
          <select
            name='role'
            value={formdata.role}
            onChange={handlechange}
            required
          >
            <option value='' disabled>
              Select Role
            </option>
            <option value='admin'>Admin</option>
            <option value='student'>Student</option>
          </select>
          <input
            type='email'
            name='email'
            placeholder='Email ID'
            value={formdata.email}
            onChange={handlechange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formdata.password}
            onChange={handlechange}
            required
          />
          <input
            type='password'
            name='confirmpassword'
            placeholder='Confirm Password'
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
