import React, { useState } from 'react';
import styled from '@emotion/styled';


const Label = styled.label`
    color: #fff;
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 2.4rem;
    font-weight: bold;
    margin-top: 2rem;
    text-transform: uppercase;

    @media screen and (max-width:995px){
        font-size: 1.3rem;
        text-align: center;
    }
`;

const Select = styled.select`
    border: none;
    border-radius: 10px;
    display: block;
    font-size: 22px;
    padding: 1rem;
    -webkit-appearance: none;
    width: 100%;

    @media screen and (max-width:995px){
        padding: .7rem 1rem;
    }
`;


const useCryptocurrency = (label, initialState, options) => {

    //State de nuestro custom hook
    const [state, setState] = useState(initialState);

    const SelectCrypto = () => (

        <>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="">- Seleccione -</option>
                {
                    options.map(option =>
                        <option
                            value={option.CoinInfo.Name}
                            key={option.CoinInfo.Id}
                        >
                            {option.CoinInfo.FullName}
                        </option>
                    )
                }
            </Select>
        </>

    )

    return [state, SelectCrypto, setState];

};

export default useCryptocurrency;