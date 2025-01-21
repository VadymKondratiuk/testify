import React, { useContext } from 'react';
import '../styles/navBar.css';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, USER_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import logo from '../assets/logo.png';
import profile from '../assets/profile.png';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div>
            <header className="header">
                <img
                    onClick={() => navigate(HOME_ROUTE)}
                    className="img-logo"
                    src={logo}
                    alt="logo"
                />
                {user.isAuth ? (
                    <img
                        onClick={() => navigate(USER_ROUTE)}
                        className="profile-icon"
                        src={profile}
                        alt="profile"
                    />
                ) : (
                    <img
                        onClick={() => navigate(LOGIN_ROUTE)}
                        className="profile-icon"
                        src={profile}
                        alt="profile"
                    />
                )}
            </header>
        </div>
    );
});

export default NavBar;
