// components/Register.tsx
'use client';
import { TextField, Button, Typography } from '@mui/material';
import { RegisterProps } from '../interfaces/LoginProps';

const Register: React.FC<RegisterProps> = ({firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, phone, setPhone, handleRegister, loading }) => {
    return (
        <div style={{ margin: '20px' }}>
            <Typography component={'span'} variant="h4">Register</Typography>
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
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
            <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Manage phone number state
            />

            <Button variant="contained" color="primary" onClick={handleRegister} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </Button>
        </div>
    );
};

export default Register;