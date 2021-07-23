import React, { Component } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function formatToReal(numero) {
    numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function ResponsiveDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.setOpen}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Deseja deletar esse registro?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Uma vez deletado esse registro, não poderá ser recuperado!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.setOpen} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={props.deleting} color="primary" autoFocus>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ResponsiveDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    deleting: PropTypes.func
}

export class Table extends Component {
    static displayName = "Registro";


    constructor() {
        super();
        this.state = { registro: [], loading: true, valueTotal: 0, totalCar: 0, totalMoto: 0, modal: false, deleting: null }
    }

    componentDidMount() {
        this.populaRegistroData();
    }

    handleEdit( id) {
        window.location.href = "/registro/edit/" + id;
    }

    handleDelete(id) {   
        fetch('api/registro/' + id, { method: 'delete' })
            .then(json => {
                this.setState({modal: false})
                window.location.href = "/ver-registro";
            }
        )  
    }

    renderIconEdit() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>  
        );
    }

    renderIconDelete() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2-fill" viewBox="0 0 16 16">
                <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
            </svg>
        );
    }

    renderRegistroTabela() {
        const { registro } = this.state;
        let valueCar = 10;
        let valueMoto = 5;
        return (
            <table className="tabela-crud">
                <tbody>
                    <tr>
                        <td>Veiculo</td>
                        <td>Placa</td>
                        <td>Entrada</td>
                        <td>Saída</td>
                        <td>Preço Total</td>
                        <td>Ações</td>
                    </tr>

                    {registro.map(prod => {
                        let total = 0;
                        let hour = moment(prod.saida).diff(moment(prod.entrada), 'hours');
                        const minute = moment(prod.saida).diff(moment(prod.entrada), 'minutes');
                        if (hour * 60 !== minute) {
                            hour += 1
                        }
                        total = 2 * (hour - 1);
                        if (prod.veiculo && prod.veiculo === "Moto") {
                            total += valueMoto;
                        }
                        else {
                            total += valueCar;
                        }
                        return(
                        <tr key={prod.id}>
                            <td>{prod.veiculo}</td>
                            <td>{prod.placa}</td>
                            <td>{moment(prod.entrada).format('HH:mm')}</td>
                            <td>{moment(prod.saida).format('HH:mm')}</td>
                            <td>{formatToReal(total)}</td>
                            <td>
                                    <a onClick={(id) => this.handleEdit(prod.id)}>{ this.renderIconEdit() }</a>
                                    <a className="deletar" onClick={(id) => this.setState({ deleting: prod.id, modal: true })}>{ this.renderIconDelete() }</a>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

    renderTotal() {
        const { totalCar, totalMoto, valueTotal } = this.state;

        return (
            <div className="value-total">
                <div className="title">
                    <p>Carro:</p>
                    <p>{ formatToReal(totalCar) }</p>
                </div>
                <div className="title">
                    <p>Moto:</p>
                    <p>{ formatToReal(totalMoto) }</p>
                </div>
                <div className="title">
                    <p>Preço Total:</p>
                    <p>{ formatToReal(valueTotal) }</p>
                </div>
            </div>        
        );
    }

    render() {
        const { loading, deleting, modal } = this.state;

        return (
            <div className="container">
                <div className="normal" id="normal">
                    {!loading ? this.renderRegistroTabela() : <p><em>Carregando...</em></p>}
                </div>
                {this.renderTotal()}
                <ResponsiveDialog
                    open={modal}
                    setOpen={() => this.setState({ modal: false })}
                    deleting={() => this.handleDelete(deleting)}
                />
            </div>
        );
    }

    async populaRegistroData() {
        const response = await fetch('api/Registro');
        const data = await response.json();
        let value = 0;
        let cars = 0;
        let motos = 0;
        data.map(veic => {
            let total = 0;
            let hour = moment(veic.saida).diff(moment(veic.entrada), 'hours');
            const minute = moment(veic.saida).diff(moment(veic.entrada), 'minutes');
            if (hour * 60 !== minute) {
                hour += 1
            }
            total = 2 * (hour - 1);
            switch (veic.veiculo) {
                case 'Moto':
                    motos += total + 5;
                    value += total + 5;
                    return null;
                default:
                    cars += total + 10;
                    value += total + 10;
                    return null;
            }
        })
        this.setState({ registro: data, loading: false, valueTotal: value, totalMoto: motos, totalCar: cars });
    }
}