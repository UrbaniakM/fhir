import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

import AppMenu from './AppMenu';

fontawesome.library.add(solid);

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <AppMenu />
            </div>
        );
    }
}

export default App;
