import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import AuthStyle from '../style/auth.module.css'
import { Link } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const {name, email, password} = formData
    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(isErrorAuth) {
            toast.error(messageAuth)
        }

        dispatch(reset())
    }, [isErrorAuth, messageAuth, dispatch])

    useEffect(() => {
        if(isSuccessAuth || user) {
            if (isSuccessAuth)
                toast.success("Registered successfully.")
            navigate('/')
        }
    }, [user, isSuccessAuth, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            name,
            email,
            password
        }

        dispatch(register(userData))
    }

    if (isLoadingAuth) {
        return <Spinner />
    }

    return (
        <div className="mainContainer">
            <div className={AuthStyle.container}>
                <div className={AuthStyle.header}>
                    <div className={AuthStyle.logo}><span className={AuthStyle.highlighted}>B</span>oard<span className={AuthStyle.highlighted}>G</span>ames</div>
                    <div className={AuthStyle.signUp}>Already having an account? <span className={AuthStyle.highlighted}><Link to={'/login'}>Login</Link></span></div>
                </div>
                <div className={AuthStyle.content}>
                    <div className={AuthStyle.image} style={{backgroundImage: "url('register.svg')"}}></div>
                    <form onSubmit={onSubmit} className={AuthStyle.form}>
                        <div className={AuthStyle.title}>Welcome!</div>
                        <div className={AuthStyle.subtitle}>Sign up to continue</div>
                        <input type="text" id="name" name="name" value={name} onChange={onChange} required placeholder='Name'/>
                        <input type="text" id="email" name="email" value={email} onChange={onChange} required placeholder='Email'/>
                        <input type="password" id="password" name="password" value={password} onChange={onChange} required placeholder='Password'/>
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register