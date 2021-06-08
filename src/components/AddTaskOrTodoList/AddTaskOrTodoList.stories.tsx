import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
//import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'Add Task or todoList',
    component: AddTaskOrTodoList
}

//const callback =  action('btn add was pressed')

export const AddTaskOrTodoListExample = (props: any) => {
    return <AddTaskOrTodoList addTodoList={() => {}} />
}


