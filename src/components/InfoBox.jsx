import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

import './InfoBox.css';

const Wrapper = styled(Card)`
  background-color: #f3f2f8 !important;
  flex: 1;
  cursor: pointer;

  border: ${({ active }) => active && '3px solid greenyellow'}

  border-color: ${({ isRed }) => isRed && 'red'};

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Red = styled.h2`
  color: #cc1034;
  font-weight: 600;
  font-size: 1.75rem;
`;

const Green = styled.h2`
  color: lightgreen !important;
  color: #cc1034;
  font-weight: 600;
  font-size: 1.75rem;
`;

const Total = styled(Typography)`
  color: #6c757d;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  margin-top: 0.5rem !important;
`;

const InfoBox = ({ title, cases, total, active, isRed, onClick }) => (
  <Wrapper
    onClick={onClick}
    // className={`${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}
    // className={`${active && 'infoBox--selected'}`}
    // {...(active && { active })}
    {...(isRed && { isRed }, active && { active })}
  >
    <CardContent>
      <Typography gutterBottom>{title}</Typography>

      {/* <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2> */}

      {!isRed ? <Green>{cases}</Green> : <Red>{cases}</Red>}

      <Total color="textSecondary">{total} Total</Total>
    </CardContent>
  </Wrapper>
);

export default InfoBox;
