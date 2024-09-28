// components/Login.tsx
'use client';
import { TextField, Button, Typography } from '@mui/material';
import { LoginProps } from '../interfaces/LoginProps';

const Login: React.FC<LoginProps> = ({ email, setEmail, password, setPassword, handleLogin, loading }) => {
    return (
        <div style={{ margin: '20px' }}>
            <Typography component={'span'} variant="h4">Login</Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
    );
};

export default Login;