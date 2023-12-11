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
import {SlBadge} from "react-icons/sl";
import Papa from 'papaparse';
import regionsFile from '../data/romania_regions.csv'
import {updateUser} from "../features/auth/authSlice";
import {getGames} from "../features/games/gamesSlice";
import Select from 'react-select';
import GamesStyle from "../style/games.module.css";

function Account() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoadingAuth, isErrorAuth, isSuccessAuth, messageAuth} = useSelector((state) => state.auth)
    const {games, isSuccessGames, isErrorGames, isLoadingGames, messageGames} = useSelector((state) => state.games)
    const [activeTile, setActiveTile] = useState('info')
    const infoRef = useRef()
    const prefRef = useRef()
    const badgesRef = useRef()
    const [type, setType] = useState('view')
    const [regions, setRegions] = useState([])
    const [gamesOptions, setGamesOptions] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        pref_games: [],
        pref_min_players: 2,
        pref_max_players: 2
    })

    const resetFormData = () => {
        if (user && user.pref_games) {
            let newSelectedGamesOptions = []
             user.pref_games.map((game) => {
                newSelectedGamesOptions.push({value: game._id, label: game.title})
            })
            setFormData({
                name: user.name,
                email: user.email,
                location: user.location,
                pref_games: newSelectedGamesOptions,
                pref_max_players: user.pref_max_players,
                pref_min_players: user.pref_min_players
            })
        }
    }

    useEffect(() => {
        if (isSuccessAuth) {
            setActiveTile('info')
            setType('view')
            resetFormData()
        }
    }, [isSuccessAuth])

    useEffect(() => {
        // fetch games from backend
        dispatch(getGames())
    }, [])

    useEffect(() => {
        if (games && isSuccessGames) {
            let newGamesOptions = []
            games.map((game) => {
                newGamesOptions.push({value: game._id, label: game.title})
            })
            setGamesOptions(newGamesOptions)
        }
    }, [games, isSuccessGames])

    useEffect(() => {
        resetFormData()
    }, [user])

    useEffect(() => {
        Papa.parse(regionsFile, {
            download: true,
            complete: function (input) {
                setRegions(input.data)
            }
        });
    }, [])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (infoRef.current) {
            infoRef.current.style.backgroundColor = 'white'
            infoRef.current.style.color = 'black'
        }

        if (badgesRef.current) {
            badgesRef.current.style.backgroundColor = 'white'
            badgesRef.current.style.color = 'black'
        }

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
        } else if (activeTile === 'badges') {
            badgesRef.current.style.backgroundColor = '#393E46'
            badgesRef.current.style.color = 'white'
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

    useEffect(() => {
        if (isErrorAuth) {
            toast.error(messageAuth)
        }
    }, [isErrorAuth, isSuccessAuth, messageAuth])

    const submitSave = () => {
        if (type === 'edit') {
            dispatch(updateUser(formData))
            setType('view')
        }
    }

    const submitPrefSave = () => {
        if (type === 'edit') {
            dispatch(updateUser(formData))
            setType('view')
        }
    }

    if (isLoadingAuth || isLoadingGames) {
        return <Spinner />
    }

    return (
        <>
            <Topbar user={user}/>
            <div className='contentContainer' style={{flexDirection: 'row', gap: '30px'}}>
                <div className={AccountStyle.sidebar}>
                    <div className={AccountStyle.sidebarItem} onClick={() => {setActiveTile('info'); setType('view'); resetFormData()}} ref={infoRef} style={{color: 'white', backgroundColor: '#393E46'}}><RiAccountPinBoxLine/> Account info</div>
                    { user.type === 'client' ? (
                        <>
                            <div className={AccountStyle.sidebarItem} onClick={() => {setActiveTile('pref'); setType('view'); resetFormData()}} ref={prefRef}><TbDeviceGamepad/> Game preferences</div>
                            <div className={AccountStyle.sidebarItem} onClick={() => {setActiveTile('badges'); setType('view'); resetFormData()}} ref={badgesRef}><SlBadge/> Badges</div>
                        </>
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
                                      <input className={AccountStyle.infoItemInput} value={formData.name} disabled={type === 'view'} name='name' onChange={onChange}/>
                                  </div>
                                  <div className={AccountStyle.infoItem}>
                                      <label className={AccountStyle.infoItemLabel}>Email</label>
                                      <input className={AccountStyle.infoItemInput} value={formData.email} disabled={true} name='mail' onChange={onChange}/>
                                  </div>
                                    { user.type === 'client' ? (
                                        <div className={AccountStyle.infoItem}>
                                            <label className={AccountStyle.infoItemLabel}>Location</label>
                                            <select className={AccountStyle.infoItemInput} value={formData.location} name='location' defaultValue={formData.location} disabled={type === 'view'} onChange={onChange}>
                                                {regions.map((region) => {
                                                    return <option value={region[0]}>{region[0]}</option>
                                                })}
                                            </select>
                                        </div>
                                    ) : <></>}
                                    { user.type === 'client' ? (
                                        type === 'edit' ? (
                                        <button className={AccountStyle.button} onClick={submitSave}>Save</button>
                                        ) : (
                                            <button className={AccountStyle.button} onClick={() => {setType('edit')}}>Edit</button>
                                        )
                                    ) : <></>}
                              </div>
                          </>
                        ) : null
                    }
                    { activeTile === "pref"
                        ? (
                            <>
                                <div className={AccountStyle.mainInfoTitle}>Game preferences</div>
                                <div className={AccountStyle.infoContainer}>
                                    <div className={AccountStyle.infoItem}>
                                        <label className={AccountStyle.infoItemLabel}>Favourite games</label>
                                        <Select
                                            isMulti
                                            name="pref_games"
                                            options={gamesOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={(e) => {setFormData((prevState) => ({
                                                ...prevState,
                                                pref_games: e
                                            }))}}
                                            value={formData.pref_games}
                                            isDisabled={type === 'view'}
                                        />
                                    </div>
                                    <label className={AccountStyle.infoItemLabel} style={{marginBottom: '-10px'}}>Preferred number of players</label>
                                    <div className={AccountStyle.infoItem} style={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: '15px'}}>
                                        <input type='number' className={GamesStyle.addItemInput} min={2} name='pref_min_players' value={formData.pref_min_players} onChange={onChange} disabled={type === 'view'}/>
                                        <div>to</div>
                                        <input type='number' className={GamesStyle.addItemInput} min={2} name='pref_max_players' value={formData.pref_max_players} onChange={onChange} disabled={type === 'view'}/>
                                    </div>
                                    {type === 'edit' ? (
                                        <button className={AccountStyle.button} onClick={submitPrefSave}>Save</button>
                                    ) : (
                                        <button className={AccountStyle.button} onClick={() => {setType('edit')}}>Edit</button>
                                    )}
                                </div>
                            </>
                        ) : null
                    }
                    { activeTile === "badges"
                        ? (
                            <>
                                <div className={AccountStyle.mainInfoTitle}>Badges</div>
                            </>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Account