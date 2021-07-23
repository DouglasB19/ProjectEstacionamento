import React, { Component } from 'react';


export class Home extends Component {

    render() {
        return (
            <div className="container home" id="home">
                <h1>
                    Bem vindo!
                </h1>
                <p>
                    <em>Este é projeto de controle</em>
                    <br />
                    <em>de estacionamento.</em>
                </p>
            </div>
        );
    }
}