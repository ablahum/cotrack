import React from 'react';
import numeral from 'numeral';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin-top: 20px;
  overflow: auto;
  color: #6a5d5d;
  background-color: white;
  height: 450px;
`;

const TRow = styled.tr`
  display: flex;
  justify-content: space-between;

  &:nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`;

const TData = styled.td`
  padding: 0.5rem;
  border: none;
`;

const Table = ({ countries }) => (
  <Wrapper>
    {countries.map((country, i) => (
      <TRow key={i}>
        <TData>{country.country}</TData>
        <TData>
          <strong>{numeral(country.cases).format('0,0')}</strong>
        </TData>
      </TRow>
    ))}
  </Wrapper>
);

export default Table;
