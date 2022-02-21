import React from 'react';
import styled from '@emotion/styled';

const QuoteStyles = styled.h2`
color: #fff;
`

export const Quote = ({price, criptomoneda: cryptocurrency}) => {
    if(Object.keys(price).length === 0) return null;

    return <QuoteStyles>El precio del {cryptocurrency} es: {price}</QuoteStyles>;
};
