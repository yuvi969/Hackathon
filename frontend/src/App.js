import './App.css'
import { Homepage } from './homepage'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { Createacc } from './signup'
import { Studentlogin } from './studentlogin'
import { Adminlogin } from './adminlogin'
import { Studenthome } from './studenthome'
import { AdminHome } from './adminapphomepage'
import UploadAnswerSheet from './uploadstudentans'
import AddExam from './addcorrectans'
import { EditExam } from './editexam'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/register' element={<Createacc />}></Route>
          <Route path='/studentlogin' element={<Studentlogin />}></Route>
          <Route path='/adminlogin' element={<Adminlogin />}></Route>
          <Route path='/admin/home' element={<AdminHome />}></Route>
          <Route path='/student/home' element={<Studenthome />}></Route>
          <Route
            path='/admin/home/uploadans'
            element={<UploadAnswerSheet />}
          ></Route>
          <Route path='/admin/home/add-exam' element={<AddExam />}></Route>
          <Route path='/admin/home/editexam/:id' element={<EditExam />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
