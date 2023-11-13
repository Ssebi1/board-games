import React from 'react';
import TopbarStyle from '../style/topbar.module.css'
import AuthStyle from "../style/auth.module.css";
import {RiAccountCircleLine} from "react-icons/ri";
import {Link} from "react-router-dom";

function Topbar({user}) {
    return (
        <div className={TopbarStyle.container}>
            <div className={TopbarStyle.innerContainer}>
                <div className={TopbarStyle.left}>
                    <Link to={'/'} className={TopbarStyle.logo}><span className={AuthStyle.highlighted}>B</span>oard<span className={AuthStyle.highlighted}>G</span>ames</Link>
                    <div className={TopbarStyle.items}>
                        { user.type === 'admin' ? (
                            <>
                            </>
                        ) : (
                            <>
                                <Link to={'/games'} className={TopbarStyle.item}>GAMES</Link>
                                <Link to={'/users'} className={TopbarStyle.item}>USERS</Link>
                            </>
                        )
                        }

                    </div>
                </div>
                <div className={TopbarStyle.right}>
                    <Link to={'/account'} className={TopbarStyle.account}>
                        <div className={TopbarStyle.icon}><RiAccountCircleLine/></div>
                        <div className={TopbarStyle.name}>{user.name}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Topbar