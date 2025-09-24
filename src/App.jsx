import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './component/Dashboard/Dashboard';
import Login from './component/auth/Login';
function App() {

  return (
    <>
    <Router>
      <Routes>
       <Route path='/' element={<Login/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
