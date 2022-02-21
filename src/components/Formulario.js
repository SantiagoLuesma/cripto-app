import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useCoin from '../hooks/useCoin';
import useCryptocurrency from '../hooks/useCryptocurrency';
import { Error } from './Error';
import axios from 'axios';


const Button = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;


const Formulario = ({saveMoneda, saveCriptomoneda}) => {

  // State de listado de criptos
  const [cryptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const COINS = [
    { code: 'USD', name: 'Dólar estadounidense' },
    { code: 'EUR', name: 'Euro' },
    { code: 'ARS', name: 'Peso argentino' },
    { code: 'GBP', name: 'Libra esterlina' }
  ];

  //Utilizar useMoneda
  const [currency, SelectCurrency] = useCoin('Elije tu moneda', '', COINS);

  //Utilizar useCriptoMoneda
  const [cryptoCurrency, SelectCrypto] = useCryptocurrency('Elije tu criptomoneda', '', cryptos);

  // Ejecutar llamado a la API
  useEffect(() => {

    const queryAPI = async () => {

      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const result = await axios.get(url);

      setCriptos(result.data.Data);

    }

    queryAPI();

  }, []);

  

  // Cuando el usuario hace submit
  const quoteCurrency = e => {
    e.preventDefault();

    // Validar si ambos campos están llenos
    if (currency === '' || cryptoCurrency === '') {
      setError(true);
      return;
    }

    // Pasar los datos al componente principal
    setError(false);
    saveMoneda(currency);
    saveCriptomoneda(cryptoCurrency);

  }



  return (
    <form onSubmit={ quoteCurrency }>


      <SelectCurrency />
      <SelectCrypto />
      <Button
          type="submit"
      >Cotizar</Button>
      { error ? <Error message="Seleccione una moneda y una criptomoneda" /> : null }
    </form>
  )
};

export default Formulario;
