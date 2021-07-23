import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {

    render() {
        return (
            <div className="container navbar">
                <header>
                    <div className="lgo">
                        <h1><Link to="/">Estacionamento</Link></h1>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/ver-registro">Visualizar</Link></li>
                            <li><Link to="/inserir-registro">Cadastrar</Link></li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}