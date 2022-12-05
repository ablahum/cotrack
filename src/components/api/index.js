import axios from 'axios';

export const getAll = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/all');
};

export const getCountries = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/countries');
};

export const getLatest = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120');
};
