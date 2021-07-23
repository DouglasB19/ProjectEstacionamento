import React, { Component } from 'react';
import moment from 'moment';


export class Registro {
    constructor() {
        this.id = 0;
        this.veiculo = "";
        this.placa = "";
        this.entrada = null;
        this.saida = null;
    }
}


export class Cadastre extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", registro: new Registro(), loading: true };

        this.handleSalvar = this.handleSalvar.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        var id;
        id = window.location.pathname.split("/")[3];
        this.inicialize(id);
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/ver-registro/");
    }

    handleSalvar(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.registro.id) {
            const responseEdit = fetch('api/Registro/' + this.state.registro.id, { method: "PUT", body: data });
            window.location.replace("/ver-registro/");
        }
        else {
            const responseCreate = fetch('api/Registro/', { method: 'POST', body: data });
            window.location.reload();
        }
    }

    render() {
        let contents = this.state.loading
            ? <div className="container normal" id="normal"><em> Carregando... </em></div>
            : this.renderForm();

        return (
            <div className="container normal" id="normal">
                <h1>{this.state.title}</h1>
                <div className="resultado"></div>
                {contents}
                <div className="resultado"></div>
            </div>
        );
    }

    renderForm() {
        return (
            <form name="formCadastro" id="formCadastro" method="post" onSubmit={ this.handleSalvar }>
                <input type="hidden" id="id" name="id" value={ this.state.registro.id } />
                <select name="veiculo" id="veiculo" defaultValue={ this.state.registro.veiculo } required>
                    <option value={ this.state.registro.veiculo = "Carro" }>Carro</option>
                    <option value={ this.state.registro.veiculo = "Moto" } >Moto</option>
                </select>
                <input type="text" name="placa" id="placa" placeholder="Placa" defaultValue={this.state.registro.placa} required />
                <input type="time" name="entrada" min="00:00" max="23:59" id="entrada" defaultValue={ moment(this.state.registro.entrada).format("HH:mm") } required />
                <input type="time" name="saida" min="00:00" max="23:59" id="saida" defaultValue={ moment(this.state.registro.saida).format("HH:mm") } required />
                <input type="submit" value={ this.state.title } />
                <input type="submit" value="Cancelar" onClick={this.handleCancel} />
            </form>
        );
    }

    async inicialize(id) {
        if (id > 0) {
            const response = await fetch('api/Registro/' + id);
            const data = await response.json();
            this.setState({ title: "Editar", registro: data, loading: false });
        }
        else {
            this.setState({ title: "Cadastrar", registro: new Registro(), loading: false });
        }
    }
}