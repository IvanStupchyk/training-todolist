import React, {useCallback, useEffect} from "react";
import s from "./App.module.scss";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {CustomizedSnackbars} from "./components/ErrorSnackbar/ErrorSnackbar";
import {appInitialized, statusType} from "./state/app-reducer";
import {TodoListsList} from "./components/TodoListsList/TodoListsList";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {logout} from "./features/Login/login-reducer";

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...restProps}: PropsType) {
    const status = useSelector<AppRootState, statusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(appInitialized())
    }, [])

    const logOut = useCallback(() => {
        dispatch(logout())
    }, [])

    if (!isInitialized) {
        return <div className={s.previewCircularProgress}>
            <CircularProgress color="secondary"/>
        </div>
    }
    return (
        <HashRouter>
            <div className={s.app}>
                <AppBar position="static" className={s.headerPosition}>
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h6">
                            TodoLists
                        </Typography>

                        {isLoggedIn && <Button color="inherit" onClick={logOut}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress className={s.linearProgress}/>}
                </AppBar>
                <CustomizedSnackbars/>
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodoListsList demo={demo}/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'*'} render={() => <h1>PAGE NOT FOUND</h1>}/>
                    </Switch>
                </Container>
            </div>
        </HashRouter>
    );
}

export default AppWithRedux;
