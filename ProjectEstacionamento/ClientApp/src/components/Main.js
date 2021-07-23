import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class Main extends Component {

    render() {
        return (
            <div className="container main" id="main">
                <h1><Link to="/ver-registro">Visualizar</Link></h1>
                <h1><Link to="/inserir-registro">Cadastrar</Link></h1>
            </div>
        );
    }
}