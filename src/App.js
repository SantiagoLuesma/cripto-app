import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import axios from 'axios';
import Form from "./components/Formulario";
import imageCripto from './criptomonedas.jpg';
import { Quote } from './components/Quote';


const Container = styled.div`
  max-width: 900px;
  margin: 5rem auto;
  padding: 0 35px;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;

  @media screen and (max-width:995px){
    display: none;
  }
`;

const Heading = styled.h1`
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }

  @media screen and (max-width:995px){
    text-align: center;
    font-size: 2em;

    &::after {
    content: '';
    background-color: #66a2fe;
    display: block;
    height: 6px;
    margin: 15px auto;
    width: 80%;
  }
  }
`


function App() {

  const [ coin, saveCoin ] = useState('');
  const [ cryptocurrency, saveCryptocurrency ] = useState('');
  const [ result, saveResult ] = useState('');

  useEffect(() => {

    const quoteCryptocurrency = async() => {
      // Evitamos la ejecución la primera vez
      if( coin === '' ) return;

      // Consultar la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`

      const result = await axios.get(url);

      saveResult(result.data.DISPLAY[cryptocurrency][coin].PRICE);
    }
    quoteCryptocurrency();

  }, [ coin, cryptocurrency ]);


  return (
    <Container>
      <div>
        <Image
          src={imageCripto}
          alt="Imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotizador de criptomonedas</Heading>
        <Form
          saveMoneda={saveCoin}
          saveCriptomoneda={saveCryptocurrency}
        />
      </div>
      {
        result !== '' ? <Quote price={result} cryptocurrency={cryptocurrency} /> : null
      }
    </Container>
  );
}

export default App;