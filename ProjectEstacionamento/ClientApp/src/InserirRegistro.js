import React, { Component } from 'react';
import { Header } from './components/Header';
import { Cadastre } from './components/Cadastre';
import { Footer } from './components/Footer';

import './index.css'

export default class InserirRegistro extends Component {

    render() {
        return (
            <div>
                <Header />
                <Cadastre />
                <Footer />
            </div>
        );
    }
}