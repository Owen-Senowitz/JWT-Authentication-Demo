import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import WeatherForecast from './components/WeatherForecast';
import Navbar from './components/Navbar';
import { CssBaseline, Container, Typography, Box } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Box sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={
            <Container>
              <Typography variant="h3" gutterBottom align="center">Welcome to Auth Demo</Typography>
              <Typography variant="body1" align="center">
                This is a sample application showing the connection between a React frontend 
                and a C# backend using JWT authentication.
              </Typography>
            </Container>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/weather" element={<WeatherForecast />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
