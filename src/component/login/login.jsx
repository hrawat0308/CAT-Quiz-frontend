import { TextField, Stack, ButtonGroup, Button, Snackbar, Alert } from "@mui/material";
import loginImg from '../../assests/login.svg';
import { useEffect, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../store";
import { loginInApp, registerInApp } from "../../store/login";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector((state) => state.login.name);
    const email = useSelector((state) => state.login.email);
    const password = useSelector((state) => state.login.password);
    const errorMessage = useSelector((state) => state.login.snackbarMessage);
    const snackbarOpen = useSelector((state) => state.login.snackbarOpen);
    const [type, setType] = useState('login');

    useEffect(() => {
        dispatch(loginActions.resetLoginValues());
    }, [])

    const saveButton = type === 'login' ? !(email && password) : !(name && email && password);

    const buttonActionHandler = () => {
        if (type === 'login') {
            dispatch(loginInApp(navigate));
        }
        else {
            dispatch(registerInApp(navigate));
        }
    }

    const fieldTextChangeHandler = (fieldType, value) => {
        switch (fieldType) {
            case 'name': dispatch(loginActions.setName({ name: value }));
                break;
            case 'email': dispatch(loginActions.setEmail({ email: value }));
                break;
            case 'password': dispatch(loginActions.setPassword({ password: value }));
                break;
        }
    }

    return (
        <Stack sx={{ width: '100%', height: '100vh' }} justifyContent="center" alignItems="center">
            <Stack direction="row" sx={{ width: '90%' }} alignItems="center" justifyContent="center">
                <Stack sx={{ width: '50%', borderRadius: 5, paddingTop: 10, paddingBottom: 10 }} rowGap={3} alignItems="center">
                    {type === 'register' && <TextField
                        id="fullname"
                        label="Name"
                        placeholder="Name"
                        variant="filled"
                        sx={{ width: '70%' }}
                        value={name}
                        onChange={(e) => fieldTextChangeHandler('name', e.target.value)}
                    />
                    }
                    <TextField
                        id="email"
                        label="Email"
                        placeholder="Email"
                        variant="filled"
                        sx={{ width: '70%' }}
                        value={email}
                        onChange={(e) => fieldTextChangeHandler('email', e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        placeholder="password"
                        variant="filled"
                        sx={{ width: '70%' }}
                        value={password}
                        onChange={(e) => fieldTextChangeHandler('password', e.target.value)}
                    />
                    <Button
                        variant='contained'
                        onClick={buttonActionHandler}
                        disabled={saveButton}
                    >
                        {type}
                    </Button>
                    <ButtonGroup sx={{ width: '50%' }} orientation="vertical" aria-label="Vertical button group" variant="text" size="large">
                        {
                            type === 'login' &&
                            <Button
                                key="register"
                                onClick={() => {
                                    setType('register')
                                    dispatch(loginActions.resetLoginValues());
                                }}
                            >
                                Don't have an account? Register
                            </Button>}
                        {
                            type === 'register' &&
                            <Button
                                key="register"
                                onClick={() => {
                                    setType('login')
                                    dispatch(loginActions.resetLoginValues());
                                }}
                            >
                                Login
                            </Button>}
                        <Button key="google-login" startIcon={<GoogleIcon />}>Login with Google</Button>
                    </ButtonGroup>
                </Stack>
                <img src={loginImg} height={700} width={'50%'} alt="login-illustration" />
            </Stack >
            <Snackbar
                open={snackbarOpen}
                onClose={() => dispatch(loginActions.setSnackbar({ snackbarOpen: false }))}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => dispatch(loginActions.setSnackbar({ snackbarOpen: false }))}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Stack >
    );
}

export default Login; 