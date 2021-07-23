import React, { Component } from 'react';
import { Home } from './components/Home';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

import './index.css'

export default class App extends Component {

  render () {
    return (
        <div>
            <Home />
            <Main />
            <Footer />
        </div>
    );
  }
}
