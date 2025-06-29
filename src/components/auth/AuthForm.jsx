import styles from '../styles/AuthForm.module.css'
import { useState } from 'react'
import { FaEyeSlash, FaEye, FaGithub, FaTwitter, FaUser } from "react-icons/fa";

import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


import googleIcon from '../../assets/googleIcon.svg'
import Button from '../common/Button'


export default function AuthForm({ type, toggleMethod }) {
    const titles = {
        'signin': "Sign in now",
        'signup': "Sign up now"
    }

    const [showPassword, setShowPassword]= useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')


    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        const isValidPasswordFormat = /^[A-Za-z0-9!@#$%^&*()_+=\[\]{}|:;<>?.\/~-]+$/.test(password)
        const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const isValidUsernameFormat = /^[A-Za-z0-9!@#$%^&*()_+=\[\]{}|:;<>?.\/~-]+$/.test(username)

        if (!password) {
            newErrors.password = "Password is required!"
        } else if (!isValidPasswordFormat) {
            newErrors.password = "Used characters not allowed in password!"
        } else if (password.length < 8) {
            newErrors.password = "Password cannot be less than 8 characters!"
        } else if (password.length > 32) {
            newErrors.password = "Password cannot be greater than 32 characters!"
        }

        if (type == 'signup') {
            if (!email.trim()) {
                newErrors.email = "Email is required!"
            } else if (!isValidEmailFormat) {
                newErrors.email = "Email format is incorrect!"
            }
        } else if (type == 'signin') {
            if (!username.trim()) {
                newErrors.username = "Username is required!"
            } else if (!isValidUsernameFormat) {
                newErrors.username = "Used characters not allowed in username!"
        }
        }

        if (Object.values(newErrors).length != 0) {
            setErrors(newErrors)
            return false
        } else {
            return true
        }
    }

    const handleAuth = (authType) => {
        // no need to cut muahs here cuz im only doing frontend rightnow backend will be later
        // alert(`In the future, you will probably ${titles[type] || 'do something great'}`)

        
    }

    return (
        <>
        
        <div className={styles.wrapper}>
            <div className={styles.form}>
                
                <h2 className={styles.title}>{titles[type] || 'Undefined'}</h2>

                {type == 'signup' ? (
                    <div className={styles.auth_email}>

                        <input type="email" placeholder=' ' id="email_input" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <label htmlFor="email_input"><MdEmail />Email</label>

                    </div>
                ) : type == 'signin' ? (
                    <div className={styles.auth_username} >

                        <input type="text" placeholder=' ' id="username_input" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        <label htmlFor="username_input"><FaUser />Username</label>

                    </div>
                ) : "You didn't pass a valid argument for 'type'"}
                
            
                <p className={styles.errors}>{errors[type=='signin' ? 'username' : 'email']} &#8203;</p>

                <div className={styles.auth_password}>

                    <input type={showPassword ? 'text' : 'password'} placeholder=' ' id="password_input" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <label htmlFor="password_input"><IoLockClosed />Password</label>
                    <button className={styles.passwordShowBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                    
                </div>

                <p className={styles.errors}>{errors['password']} &#8203;</p>

                

                <div className={styles.signup_btn}>
                    
                    <Button onClick={() => {
                        if (validateForm()) handleAuth('local_auth')
                    }} variant="primary">{type == 'signin' ? 'Sign in' : type == 'signup' ? 'Sign up' : 'Undefined'}</Button>
                </div>

                

                <div className={styles.social_buttons}>
                    <p>Or continue with</p>
                    <button onClick={() => handleAuth('google_auth')} className={styles.google_btn}><img src={googleIcon} className={styles.google_icon} /> Google</button>
                    <button onClick={() => handleAuth('github_auth')} className={styles.github_btn}><FaGithub /> Github</button>
                    <button onClick={() => handleAuth('twitter_auth')} className={styles.twitter_btn}><FaTwitter /> Twitter</button>
                </div>

                <p onClick={toggleMethod} className={styles.auth_toggle_text}>{type=='signin' ? "Don't have an account? Create one now" : 
                    type=='signup' ? "Already have an account? Sign in now"  : null}</p>

                
            </div>
        </div>
        
        </>
    )
}