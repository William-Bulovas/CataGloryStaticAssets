import React from 'react';
import FacebookSignInButton from './FacebookSignInButton';
import { Link } from 'react-router-dom';
import CreateGameButton from './CreateGameButton';

interface Props {
    loginState: boolean,
    refreshCreated: () => void
};

export default function NavBar(props: Props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <a className="navbar-brand" href="/">CataGlory</a>
        
            <div className="navbar-nav ml-auto">
                <Link className="nav-link" to="/privacy">
                    Privacy Policy
                </Link>

                { !props.loginState && <FacebookSignInButton largeBtn={false}/> }
                { props.loginState && <CreateGameButton refresh={props.refreshCreated}/> }
            </div>
        </nav>
    );
};