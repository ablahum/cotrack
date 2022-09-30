import React, { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent } from '@material-ui/core'
import { sortData, prettyPrintStat } from './util'
import numeral from 'numeral'
import 'leaflet/dist/leaflet.css'
import styled from '@emotion/styled'
import axios from 'axios'

import { Header as HeaderContent, InfoBox, LineGraph, Map, Table } from './components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: #f5f6fa;
  padding: 20px;
`

const Left = styled.div`
  flex: 0.9;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`

const Right = styled(Card)``

const App = () => {
  const [country, setInputCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])
  const [mapCountries, setMapCountries] = useState([])
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState('cases')
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          let sortedData = sortData(data)
          setCountries(countries)
          setMapCountries(data)
          setTableData(sortedData)
        })
    }

    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    const res = await axios.get(url)

    setInputCountry(countryCode)
    setCountryInfo(res.data)
    setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long])
    setMapZoom(4)
  }

  return (
    <Wrapper>
      <Left>
        <Header>
          <HeaderContent title={'COTRACK'} countries={countries} country={country} onChange={onCountryChange} />
        </Header>

        <Stats>
          <InfoBox onClick={(e) => setCasesType('cases')} title='Coronavirus Cases' isRed active={casesType === 'cases'} cases={prettyPrintStat(countryInfo.todayCases)} total={numeral(countryInfo.cases).format('0.0a')} />

          <InfoBox onClick={(e) => setCasesType('recovered')} title='Recovered' active={casesType === 'recovered'} cases={prettyPrintStat(countryInfo.todayRecovered)} total={numeral(countryInfo.recovered).format('0.0a')} />

          <InfoBox onClick={(e) => setCasesType('deaths')} title='Deaths' isRed active={casesType === 'deaths'} cases={prettyPrintStat(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format('0.0a')} />
        </Stats>

        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
      </Left>

      <Right className='app__right'>
        <CardContent>
          <div className='app__information'>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Right>
    </Wrapper>
  )
}

export default App
