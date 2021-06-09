import React from "react";
import {Task} from "../components/Todolist/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/api";

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
              task={{
                  id: v1(),
                  title: 'ffrfrf',
                  description: '',
                  completed: false,
                  priority: TaskPriorities.Low,
                  startDate: '',
                  deadline: '',
                  todoListId: '',
                  order: 0,
                  addedDate: '',
                  status: TaskStatuses.New}}
        />
        <Task todoListID={'todoListId2'}
              taskID={'2'}
              task={{
                  id: v1(),
                  title: '222222',
                  description: '',
                  completed: false,
                  priority: TaskPriorities.Low,
                  startDate: '',
                  deadline: '',
                  todoListId: '',
                  order: 0,
                  addedDate: '',
                  status: TaskStatuses.Completed
              }}
        />
    </>
}