import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:5265/api';

export interface UserLoginDto {
  username: string;
  password:  string;
}

export interface UserRegisterDto {
  username: string;
  password:  string;
}

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  exp: number;
}

export const register = async (userData: UserRegisterDto) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const login = async (userData: UserLoginDto) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  if (!user || !user.token) return false;
  
  try {
    const decoded: any = jwtDecode(user.token);
    // ASP.NET Core often uses this long URI for roles
    const longRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    // But sometimes it uses the short name "role"
    const shortRole = decoded["role"];
    
    return longRole === "Admin" || shortRole === "Admin";
  } catch {
    return false;
  }
};

export const getWeather = async () => {
  const user = getCurrentUser();
  if (!user || !user.token) return null;
  
  const response = await axios.get(`${API_URL}/WeatherForecast`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
  return response.data;
};

export const getAdminStats = async () => {
  const user = getCurrentUser();
  if (!user || !user.token) return null;

  const response = await axios.get(`${API_URL}/WeatherForecast/admin-stats`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
  return response.data;
};
