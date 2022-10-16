import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import styled from '@emotion/styled'

import './InfoBox.css'

const Wrapper = styled(Card)`
  background-color: #f3f2f8 !important;
  flex: 1;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 10px;
    background-color: tomato;
  }
`

const Red = styled.h2`
  color: #cc1034;
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`

const Green = styled.h2`
  color: lightgreen !important;
`

const Total = styled(Typography)`
  color: #6c757d;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  margin-top: 15px !important;
`

const InfoBox = ({ title, cases, total, active, isRed, onClick }) => {
  return (
    <Wrapper onClick={onClick} className={`${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          {title}
        </Typography>

        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>

        <Typography className='infoBox__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Wrapper>
  )
}

export default InfoBox
