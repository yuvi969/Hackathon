import { Link } from 'react-router'
function Homepage() {
  return (
    <>
      <div className='Homediv'>
        <h1 className='appname'>OVERCLOCKERS</h1>
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
