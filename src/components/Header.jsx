import React from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@material-ui/core';

const Title = styled.h1`
  color: #fc3c3c;
  font-size: 2rem;
`;

const Dropdown = styled(FormControl)`
  background-color: white;
`;

const Header = ({ title, countries, country, onChange }) => (
  <>
    <Title>{title}</Title>

    <Dropdown>
      <Select
        variant="outlined"
        value={country}
        onChange={onChange}
      >
        <MenuItem value="worldwide">Worldwide</MenuItem>

        {countries.map(({ value, name }) => (
          <MenuItem
            key={value}
            value={value}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </Dropdown>
  </>
);

export default Header;
