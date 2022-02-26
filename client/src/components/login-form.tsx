import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import theme from '../assets/theme';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const [email, getEmail] = useState('');
  const [password, getPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(email + password);
  };

  return (
    <ThemeProvider theme={theme}>
    <FormControl>
      <TextField 
        id="login-text" 
        type="email" 
        required 
        label="Email" 
        value={email} 
        onChange={e => getEmail(e.target.value)}
      />
      <TextField 
        id="login-text" 
        type="password" 
        required 
        label="Password" 
        value={password} 
        onChange={e => getPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
      </FormControl>
  </ThemeProvider>
  )

}

export default LoginForm;
