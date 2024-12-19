import React from "react"
import { Route, Routes } from "react-router-dom"
import RegisterScreen from "./Screens/RegisterScreen"
import LoginScreen from "./Screens/LoginScreen"

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/'        element= { <LoginScreen/> }/>
                <Route path='/login'   element= { <LoginScreen/> }/>
                <Route path='/register'element= { <RegisterScreen/>  } />
            </Routes>
        </div>
    )
}

export default App