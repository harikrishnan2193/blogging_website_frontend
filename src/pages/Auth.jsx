import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allApi';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function Auth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isLoginPath = location.pathname === '/login';
    const isRegisterPath = location.pathname === '/register';
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    // console.log(userData);


    //function to register
    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = userData
        if (!name || !email || !password || !confirmPassword) {
            Swal.fire("Please fill all the form completily")
        }
        else if (password !== confirmPassword) {
            Swal.fire("Passwords do not match")
        }
        else {
            const result = await registerAPI(userData)
            console.log(result);

            if (result.status === 200) {
                Swal.fire(`${result.data.name} is successfully registered`)
                setUserData({ name: "", email: "", password: "", confirmPassword: "" })
                navigate('/login')
            }
            else {
                Swal.fire(`${result.response.data}`)
                if (result.status === 406) {
                    navigate('/register')
                }
            }

        }
    }

    //login function
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = userData
        if (!email || !password) {
            Swal.fire("Please fill the form completily")
        }
        else {
            const result = await loginAPI(userData)
            console.log(result);

            if (result.status === 200) {
                sessionStorage.setItem('userDetils', JSON.stringify(result.data.existUser))
                sessionStorage.setItem('token', result.data.token)

                dispatch(login())

                navigate('/admin');
                Swal.fire("Login successfull. Welcome to Admin page")
            }
            else {
                Swal.fire(`${result.response.data}`)
            }
        }
    }


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.login_box}>
                    <div className={styles.login_header}>
                        <span>{isLoginPath ? 'Login' : 'Sign Up'}</span>
                    </div>

                    {isRegisterPath && (
                        <div className={styles.input_box}>
                            <input onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} type="text" id="user" className={styles.input_field} required />
                            <label htmlFor="user" className={styles.label}>Username</label>
                            <i className={`fa-regular fa-user ${styles.icone}`}></i>
                        </div>
                    )}

                    <div className={styles.input_box}>
                        <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} type="text" id="email" className={styles.input_field} required />
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <i className={`fa-regular fa-envelope ${styles.icone}`}></i>
                    </div>

                    <div className={styles.input_box}>
                        <input onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} type="password" id="pass" className={styles.input_field} required />
                        <label htmlFor="pass" className={styles.label}>Password</label>
                        <i className={`fa-solid fa-lock ${styles.icone}`}></i>
                    </div>

                    {isRegisterPath && (
                        <div className={styles.input_box}>
                            <input onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} value={userData.confirmPassword} type="password" id="confirmPass" className={styles.input_field} required />
                            <label htmlFor="confirmPass" className={styles.label}>Confirm Password</label>
                            <i className={`fa-solid fa-key ${styles.icone}`}></i>
                        </div>
                    )}

                    {/* <div className={`text-end ${styles.forgot}`}>
                        <a href="#">Forgot Password?</a>
                    </div> */}

                    {isLoginPath ?
                        <div onClick={handleLogin} className={styles.input_box}>
                            <input type="submit" className={styles.input_submit} value="Login" />
                        </div>
                        :
                        <div onClick={handleRegister} className={styles.input_box}>
                            <input type="submit" className={styles.input_submit} value="register" />
                        </div>
                    }

                    {isLoginPath ?
                        <div className={`text-center ${styles.register}`}>
                            <span>Do not have an account? <a href="/register">Register</a></span>
                        </div>
                        :
                        <div className={`text-center ${styles.register}`}>
                            <span>Do not have an account? <a href="/login">Login</a></span>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Auth;
