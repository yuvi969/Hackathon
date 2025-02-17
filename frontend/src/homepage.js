import { Link } from 'react-router'
import penimg from './penimg.png'
function Homepage() {
  return (
    <>
      <div className='Homediv'>
        <img src={penimg} alt='logo' />
        <h1 className='appname'>Red Pen</h1>
        <div className='subtitle-container'>
          <h3>Transparent Testing Solutions</h3>
        </div>
        <div className='buttoncontainer'>
          <Link to={'/adminlogin'}>
            <button className='Adminloginbutton'>Admin Login</button>
          </Link>
          <Link to={'/studentlogin'}>
            <button className='studentloginbutton'>Student Login</button>
          </Link>
        </div>
        <Link to={'/register'}>
          <p>New Account</p>
        </Link>
      </div>
    </>
  )
}

export { Homepage }
