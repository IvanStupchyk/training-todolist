import React from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {CustomizedSnackbars} from "../../components/ErrorSnackbar/ErrorSnackbar";
import st from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppRootState} from "../../state/redux-store";
import {Redirect} from "react-router-dom";


export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }

            if (!values.email) {
                return {
                    email: 'email is required'
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            }
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    const disabledBtnSubmit = !formik.values.email || !formik.values.password

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel style={{textAlign: 'center'}}>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        <div className={st.promptValidation}>{formik.errors.email ? formik.errors.email : ''}</div>
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        <div
                            className={st.promptValidation}>{formik.errors.password ? formik.errors.password : ''}</div>
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button disabled={disabledBtnSubmit} type={'submit'} variant={'contained'}
                                color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
        <CustomizedSnackbars/>
    </Grid>
}