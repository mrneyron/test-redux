import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useSearchParams} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Filter from './Filter';
import {useTypedSelector} from '../actions/useTypedSelector';
import {useActions} from '../actions/useActions';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';

export default function Result() {
  const [searchParams] = useSearchParams();
  const country = searchParams.get("filter[country]") || "";
  const city = searchParams.get("filter[city]") || "";
  const priceFrom = searchParams.get("filter[priceFrom]") || "";
  const priceTo = searchParams.get("filter[priceTo]") || "";
  const rating = searchParams.get("filter[rating]") || "";

  const {result, limit, offset, loading, error} = useTypedSelector(state => state.result);
  const {fetchResult, setLimit} = useActions();

  const fetchData = () => {
    const filterState = {
      country,
      city,
      priceFrom: parseInt(priceFrom),
      priceTo: parseInt(priceTo),
      rating: parseInt(rating) || null,
    }
    fetchResult(filterState, limit);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [limit]);

  function handleMore() {
    setLimit(limit + offset);
  }

  if (error) {
    return (<Box sx={{ minHeight: "98vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h3" gutterBottom component="div">{error}</Typography>
    </Box>);
  }

  return (
    <div>
      <Filter readonly={false} />
      <Box sx={{ flexGrow: 1, padding: 1}}>
        <TableContainer component={Paper}>
          {loading ? (
            <Box sx={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress size={80} />
            </Box>
          ) :
          (<Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
              <TableRow>
                <TableCell align="left">Country</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Rating</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.country}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">
                      <Rating disabled precision={1} value={row.rating} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>)}
        </TableContainer>
        {!loading && (<Grid>
          <Grid sx={{ marginTop: 2}} container spacing={2}>
            <Hidden smDown>
              <Grid item xs={12} sm={4} md={4} lg={5} xl={5}/>
            </Hidden>
            <Grid sx={{ padding: 1}} item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Button disabled={result.length !== limit} fullWidth variant="outlined" onClick={handleMore}>More</Button>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} sm={4} md={4} lg={5} xl={5}/>
            </Hidden>
          </Grid>
        </Grid>)}
      </Box>
    </div>
  );
}