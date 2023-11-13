import {useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import React from 'react';
import toast from 'react-hot-toast';
import Topbar from "../components/Topbar";
import AccountStyle from '../style/account.module.css'
import {RiAccountPinBoxLine, RiLogoutBoxLine} from "react-icons/ri";
import {TbDeviceGamepad} from "react-icons/tb";

function Account() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const [activeTile, setActiveTile] = useState('info')
    const infoRef = useRef()
    const prefRef = useRef()

    useEffect(() => {
        infoRef.current.style.backgroundColor = 'white'
        infoRef.current.style.color = 'black'

        if (prefRef.current) {
            prefRef.current.style.backgroundColor = 'white'
            prefRef.current.style.color = 'black'
        }

        if (activeTile === 'info') {
            infoRef.current.style.backgroundColor = '#393E46'
            infoRef.current.style.color = 'white'
        } else if (activeTile === 'pref') {
            prefRef.current.style.backgroundColor = '#393E46'
            prefRef.current.style.color = 'white'
        }
    }, [activeTile])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, isErrorAuth, isSuccessAuth, messageAuth, dispatch, navigate])

    const logoutAction = () => {
        dispatch(logout())
        toast.success('Logged out succesfully')
        navigate('/')
    }

    if (isLoadingAuth) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user}/>
            <div className='contentContainer' style={{flexDirection: 'row', gap: '30px'}}>
                <div className={AccountStyle.sidebar}>
                    <div className={AccountStyle.sidebarItem} onClick={() => {setActiveTile('info')}} ref={infoRef}><RiAccountPinBoxLine/> Account info</div>
                    { user.type === 'client' ? (
                        <div className={AccountStyle.sidebarItem} onClick={() => {setActiveTile('pref')}} ref={prefRef}><TbDeviceGamepad/> Game preferences</div>
                    ) : <></>
                    }
                    <div className={AccountStyle.sidebarItem} onClick={logoutAction}><RiLogoutBoxLine/> Logout</div>
                </div>
                <div className={AccountStyle.mainInfo}>
                    { activeTile === "info"
                        ? (
                          <>
                              <div className={AccountStyle.mainInfoTitle}>Account info</div>
                              <div className={AccountStyle.infoContainer}>
                                  <div className={AccountStyle.infoItem}>
                                      <label className={AccountStyle.infoItemLabel}>Name</label>
                                      <input className={AccountStyle.infoItemInput} value={user.name} disabled={true}/>
                                  </div>
                                  <div className={AccountStyle.infoItem}>
                                      <label className={AccountStyle.infoItemLabel}>Email</label>
                                      <input className={AccountStyle.infoItemInput} value={user.email} disabled={true}/>
                                  </div>
                              </div>
                          </>
                        ) : null
                    }
                    { activeTile === "pref"
                        ? (
                            <>
                                <div className={AccountStyle.mainInfoTitle}>Game preferences</div>
                            </>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Account