import React from "react";
import s from "./App.module.scss";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {CustomizedSnackbars} from "./components/ErrorSnackbar/ErrorSnackbar";
import {statusType} from "./state/app-reducer";
import {TodoListsList} from "./components/TodoListsList/TodoListsList";

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...restProps}: PropsType) {
    const status = useSelector<AppRootState, statusType>(state => state.app.status)

    return (
        <div className={s.app}>
            <AppBar position="static" className={s.headerPosition}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6">
                        TodoLists
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress className={s.linearProgress}/>}
            </AppBar>
            <CustomizedSnackbars/>
            <Container fixed>
                <TodoListsList demo={demo}/>
            </Container>
        </div>
    );
}

export default AppWithRedux;
