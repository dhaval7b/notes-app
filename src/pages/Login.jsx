
import { TextField, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useHistory } from 'react-router';
function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault();
        const isLoggedIn = login(user, password)
        if (isLoggedIn) console.log("logged in ");
        if (isLoggedIn) {
            history.push("/")
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, maxWidth: 400, margin: 'auto', mt: 5 }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <TextField
                label="User name"
                type="test"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
            
        </Box>
    );
}

export default Login;
