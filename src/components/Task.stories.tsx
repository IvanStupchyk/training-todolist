import React from "react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: 'Task component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

//const callback = action('btn add was pressed')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task todoListID={'todoListId1'}
              taskID={'1'}
              task={{id: '1', title: 'first', isDone: false}}
        />
        <Task todoListID={'todoListId2'}
              taskID={'2'}
              task={{id: '2', title: 'second', isDone: true}}
        />
    </>
}