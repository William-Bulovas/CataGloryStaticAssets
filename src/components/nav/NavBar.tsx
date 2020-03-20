import React from 'react';
import FacebookSignInButton from './FacebookSignInButton';
import { Link } from 'react-router-dom';
import CreateGameButton from './CreateGameButton';

interface Props {
    loginState: boolean
};

export default function NavBar(props: Props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">CataGlory</a>
        
            <div className="navbar-nav ml-auto">
                <Link className="nav-link" to="/privacy">
                    Privacy Policy
                </Link>

                { !props.loginState && <FacebookSignInButton/> }
                { props.loginState && <CreateGameButton/> }
            </div>
        </nav>
    );
};
