import React, { Component } from 'react';
import { Header } from './components/Header';
import { Table } from './components/Table';
import { Footer } from './components/Footer';

import './index.css'

export default class VerRegistro extends Component {

    render() {
        return (
            <div>
                <Header />
                <Table />
                <Footer />
            </div>
        );
    }
}