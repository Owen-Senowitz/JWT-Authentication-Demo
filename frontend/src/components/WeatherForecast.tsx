import { useEffect, useState } from 'react';
import { getWeather, getCurrentUser, isAdmin, getAdminStats } from '../services/AuthService';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress, Box, Divider } from '@mui/material';

interface Weather {
  date: string;
  temperatureC: number;
  summary: string;
}

const WeatherForecast = () => {
  const [data, setData] = useState<Weather[]>([]);
  const [adminData, setAdminData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWeather();
        if (result) {
          setData(result);
        }

        if (isAdmin()) {
          const adminResult = await getAdminStats();
          setAdminData(adminResult);
        }
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Please login to see this content.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Weather Forecast</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>Welcome back, <b>{user.username}</b>!</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white' }}>Temp (C)</TableCell>
                  <TableCell sx={{ color: 'white' }}>Summary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.temperatureC}</TableCell>
                    <TableCell>{item.summary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {adminData && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 2 }} />
              <Alert severity="info" variant="outlined">
                <Typography variant="h6">Admin Only Section</Typography>
                <Typography variant="body1">{adminData.message}</Typography>
                <Typography variant="body2">Secret Data: {adminData.secretData}</Typography>
              </Alert>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default WeatherForecast;
