import { useState, useEffect } from 'react';

export function useLoginState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schoolName, setSchoolName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedSchoolName = localStorage.getItem('schoolName');
    setIsLoggedIn(!!token);
    setSchoolName(storedSchoolName || '');
  }, []);

  const login = async (school: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolName: school, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('schoolName', school);
        setIsLoggedIn(true);
        setSchoolName(school);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('schoolName');
    setIsLoggedIn(false);
    setSchoolName('');
  };

  return { isLoggedIn, schoolName, login, logout };
}