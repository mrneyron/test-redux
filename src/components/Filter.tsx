import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate, createSearchParams } from "react-router-dom";
import {useTypedSelector} from '../actions/useTypedSelector';
import {useActions} from '../actions/useActions';
import axios from "axios";
import {countryListUrl} from '../types/filter';
import {useSearchParams} from 'react-router-dom';

interface FilterProps {
  readonly?: boolean;
}

export default function Filter({readonly}: FilterProps) {
  const {limit, offset} = useTypedSelector(state => state.result);
  const [searchParams] = useSearchParams();
  const {country, city, priceFrom, priceTo, rating} = useTypedSelector(state => state.filter);

  const [priceState, setPriceState] = React.useState<number[]>([priceFrom, priceTo]);

  const [countryList, setCountryList] = React.useState<string[]>([]);

  const {setCountry, setCity, setPriceFrom, setPriceTo, setRating, fetchResult, setLimit} = useActions();
  const navigate = useNavigate();

  const getCountryList = async () => {
    const res = await axios.get(countryListUrl);
    setCountryList(res.data.data);
   };

  React.useEffect(() => {
    setCountry(searchParams.get("filter[country]") || country);
    setCity(searchParams.get("filter[city]") || city);
    const urlPriceFrom = parseInt(searchParams.get("filter[priceFrom]") || "")
    const urlPriceTo = parseInt(searchParams.get("filter[priceTo]") || "")
    setPriceFrom(Number.isInteger(urlPriceFrom) ? urlPriceFrom : priceFrom);
    setPriceTo(Number.isInteger(urlPriceTo) ? urlPriceTo : priceFrom);
    setPriceState([Number.isInteger(urlPriceFrom) ? urlPriceFrom : priceFrom, Number.isInteger(urlPriceTo) ? urlPriceTo : priceTo])
    setRating(parseInt(searchParams.get("filter[rating]") || "") || rating);
    getCountryList();
  }, []);
  
  React.useEffect(() => {
    setPriceFrom(priceState[0]);
    setPriceTo(priceState[1]);
  }, [priceState]);
  
  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const handleChangePrice = (event: Event, newValue: number | number[]) => {
    setPriceState(newValue as number[]);
  };

  async function handleSubmit() {
    const params = {
      'filter[country]': country,
      'filter[city]': city,
      'filter[priceFrom]': priceState[0].toString(),
      'filter[priceTo]': priceState[1].toString(),
      'filter[rating]': rating?.toString() || "",
    };
    navigate({
      pathname: "/result",
      search: createSearchParams(params).toString()
    });
    const filterState = {
      country,
      city,
      priceFrom: priceState[0],
      priceTo: priceState[1],
      rating: rating || null,
    }
    
    setLimit(offset);
    fetchResult(filterState, limit);
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 1}}>
      <Paper elevation={2} sx={{padding: 2}}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={3} md={3} lg={2} xl={2}>
            <FormControl disabled={readonly} fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={handleChangeCountry}
              >
                {countryList.map((item) => [
                  <MenuItem value={item}>{item}</MenuItem>
                ])}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={2} xl={2}>
            <TextField 
              fullWidth
              disabled={readonly}
              label="City"
              variant="outlined"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography component="legend">Price</Typography>
            <Slider
              value={priceState}
              disabled={readonly}
              min={0}
              max={10000}
              onChange={handleChangePrice}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={rating}
              disabled={readonly}
              precision={1}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Grid>
          <Grid sx={{ padding: 1}} item xs={12} sm={3} md={3} lg={2} xl={2}>
            <Button disabled={readonly} sx={{ height: "100%" }} fullWidth variant="outlined" onClick={handleSubmit}>Apply</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}