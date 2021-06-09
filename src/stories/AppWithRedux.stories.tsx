import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import React from "react";

export default {
    title: 'App with Redux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxExample = (props: any) => {
    return <AppWithRedux demo={true}/>
}