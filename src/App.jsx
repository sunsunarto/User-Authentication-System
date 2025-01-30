import { useState } from 'react'
import UserRegistrationForm from './Component/userRegistrationForm.jsx'
import UserLoginForm from './Component/userLoginForm.jsx'
import './App.css'

function App() {
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleRegisterClick = () => {
    setShowRegisterForm(true)
    setShowLoginForm(false)
  }

  const handleLoginClick = () => {
    setShowRegisterForm(false)
    setShowLoginForm(true)
  }

  return (
    <div className="App">
      <h1>User Registration Form</h1>
      <div className="buttons">
        {showRegisterForm ? <UserRegistrationForm /> : <button onClick={handleRegisterClick}>register</button>}
        {showLoginForm ? <UserLoginForm /> : <button onClick={handleLoginClick}>login</button>}
      </div>
    </div>
  )
}

export default App

