import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import App from './App';
import  VerRegistro  from './VerRegistro';
import InserirRegistro from './InserirRegistro';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Route path="/" component={App} exact={true} />
        <Route path="/ver-registro" exact={true} component={VerRegistro} />
        <Route path="/inserir-registro" exact={true} component={InserirRegistro} />
        <Route path="/registro/edit/:id" exact={true} component={InserirRegistro} />
    </BrowserRouter>,
  rootElement);

registerServiceWorker();

