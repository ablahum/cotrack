import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import numeral from 'numeral';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';
import axios from 'axios';

import { sortData, prettyPrintStat } from './util/index';
import { Header as HeaderContent, InfoBox, Graph, Map, Table } from './components';
import { getAll, getCountries, getLatest } from './components/api';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.9;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: space-between;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Right = styled(Card)`
  background-color: #f3f2f8 !important;
`;

const Label = styled.h3`
  color: #6a5d5d;
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-top: 1rem;
  }
`;

// BUILD CHART DATA
const buildChart = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

const App = () => {
  const [country, setInputCountry] = useState('worldwide');
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});

  const [casesType, setCasesType] = useState('cases');
  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState({});

  const [mapCountries, setMapCountries] = useState([]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });

  // GET ALL DATA (HEADER)
  const getAllData = async () => {
    const res = await getAll();

    try {
      setCountryInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // GET COUNTRY CHANGE DATA
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    let url;
    if (countryCode === 'worldwide') {
      url = 'https://disease.sh/v3/covid-19/all';
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    }
    const res = await axios.get(url);

    try {
      setInputCountry(countryCode);
      setCountryInfo(res.data);
      setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      setMapZoom(4);
    } catch (err) {
      console.log(err);
    }
  };

  // GET COUNTRIES DATA (MAP & TABLE)
  const getCountriesData = async () => {
    const res = await getCountries();

    try {
      const countries = res.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(res.data);

      setCountries(countries);
      setMapCountries(res.data);
      setTableData(sortedData);
    } catch (err) {
      console.log(err);
    }
  };

  // GET LATEST DATA (CHART)
  const getLatestData = async () => {
    const res = await getLatest();

    try {
      const chartData = buildChart(res.data, casesType);
      setGraphData(chartData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllData();
    getCountriesData();
  }, []);

  useEffect(() => {
    getLatestData();
  }, [casesType]);

  return (
    <Wrapper>
      <Left>
        <Header>
          <HeaderContent
            title="COTRACK | The COVID-19 Tracker"
            countries={countries}
            country={country}
            onChange={onCountryChange}
          />
        </Header>

        <Stats>
          <InfoBox
            onClick={() => setCasesType('cases')}
            title="Coronavirus Cases"
            isRed
            active={casesType === 'cases'}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format('0.0a')}
          />

          <InfoBox
            onClick={() => setCasesType('recovered')}
            title="Recovered"
            active={casesType === 'recovered'}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format('0.0a')}
          />

          <InfoBox
            onClick={() => setCasesType('deaths')}
            title="Deaths"
            isRed
            active={casesType === 'deaths'}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format('0.0a')}
          />
        </Stats>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </Left>

      <Right>
        <CardContent>
          <Label>Live Cases by Country</Label>

          <Table countries={tableData} />

          <Label>Worldwide new {casesType}</Label>

          <Graph graphData={graphData} />
        </CardContent>
      </Right>
    </Wrapper>
  );
};

export default App;
