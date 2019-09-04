import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [cargandoSpinner, guardarCargandoSpinner] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const cotizarCriptoMoneda = async () => {

      //si no hay moneda no ejecutar
      if(moneda ==='') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      
      const resultado = await axios.get(url);
      
      //mostrar spinner
      guardarCargandoSpinner(true);

      //ocultar spinner y mostrar el resultado
      setTimeout(() => {
        guardarCargandoSpinner(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000);
    }
    
    cotizarCriptoMoneda();
  }, [ moneda, criptomoneda]); //estas dos son las dependencias para ejecutar el useEffect

  //mostrar spinner o resultado
    const componenteSpinner = (cargandoSpinner) ? <Spinner/> : <Cotizacion resultado={resultado}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>
            <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptoMoneda={guardarCriptoMoneda}
            />
            {componenteSpinner}
          </div>
      </div>     
    </div>
    
  );
}

export default App;
