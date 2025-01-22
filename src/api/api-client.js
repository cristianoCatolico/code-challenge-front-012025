import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/tickers`,
});

export const API_METHODS = {
  GET: 'GET',
} ;