import React from 'react';
import { Map as MapLeaflet, TileLayer } from 'react-leaflet';
import styled from '@emotion/styled';

import { showDataOnMap } from '../util';

const Wrapper = styled.div`
  height: 500px;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 1rem;
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);
  background-color: #f3f2f8;

  @media screen and (max-width: 990px) {
    margin-bottom: 1rem;
  }
`;

const Leaflet = styled(MapLeaflet)`
  height: 100%;
  border-radius: inherit;
`;

const Map = ({ countries, casesType, center, zoom }) => (
  <Wrapper>
    <Leaflet
      center={center}
      zoom={zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {showDataOnMap(countries, casesType)}
    </Leaflet>
  </Wrapper>
);

export default Map;
