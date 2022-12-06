import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import styled from '@emotion/styled';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
};

export const prettyPrintStat = (stat) => (stat ? `+${numeral(stat).format('0.0a')}` : '+0');

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

// const Wrapper = styled.div`
//   width: 150px;
// `;

const Flag = styled.div`
  height: 80px;
  width: 100%;
  border-radius: 8px;
  background-size: cover;
  background-image: url(${({ bgImg }) => bgImg});
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #555;
  margin-top: 8px;
`;

const Content = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country, i) => (
    <Circle
      key={i}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        {/* <Wrapper> */}
        <Flag bgImg={country.countryInfo.flag}></Flag>

        <Title>{country.country}</Title>

        <Content>Cases: {numeral(country.cases).format('0,0')}</Content>

        <Content>Recovered: {numeral(country.recovered).format('0,0')}</Content>

        <Content>Deaths: {numeral(country.deaths).format('0,0')}</Content>
        {/* </Wrapper> */}
      </Popup>
    </Circle>
  ));
