import React from 'react'
import { Map as MapLeaflet, TileLayer } from 'react-leaflet'
import { showDataOnMap } from '../util'
import styled from '@emotion/styled'
import '../Map.css'

const Wrapper = styled.div`
  height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);
`

const Leaflet = styled(MapLeaflet)`
  height: 100%;
  border-radius: 12px;
`

function Map({ countries, casesType, center, zoom }) {
  return (
    <Wrapper>
      <Leaflet center={center} zoom={zoom}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        {showDataOnMap(countries, casesType)}
      </Leaflet>
    </Wrapper>
  )
}

export default Map
