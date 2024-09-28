// components/Register.tsx
'use client';
import { TextField, Button, Typography } from '@mui/material';
import { RegisterProps } from '../interfaces/LoginProps';

const Register: React.FC<RegisterProps> = ({ email, setEmail, password, setPassword, handleRegister, loading }) => {
    return (
        <div style={{ margin: '20px' }}>
            <Typography  component={'span'} variant="h4">Register</Typography>
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

            <Button variant="contained" color="primary" onClick={handleRegister} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </Button>
        </div>
    );
};

export default Register;