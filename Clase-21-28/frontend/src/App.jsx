import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginScreen from "./Screens/LoginScreen"
import RegisterScreen from "./Screens/RegisterScreen.jsx"
import RecoveryPasswordScreen from "./Screens/RecoveryPasswordScreen"
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen.jsx"
import HomeScreen from "./Screens/HomeScreen.jsx"
import ProductDetailScreen from "./Screens/ProductDetailScreen.jsx"
import ProtectedRoute from "./Components/ProtectedRoute.jsx"




const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/'        element= { <LoginScreen/> }/>
                <Route path='/login'   element= { <LoginScreen/> }/>
                <Route path='/register'element= { <RegisterScreen/>  } />
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path='/auth/recovery-password/:reset_token'element= { <RecoveryPasswordScreen/>  } />
                <Route element= { <ProtectedRoute/> }>  
                    <Route path="/home" element={<HomeScreen/>}/>
                    <Route path="/product/:product_id" element={<ProductDetailScreen/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
