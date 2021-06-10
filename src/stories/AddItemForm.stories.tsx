import {AddTaskOrTodoList} from "../components/AddTaskOrTodoList/AddTaskOrTodoList";
//import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'Add Item Form',
    component: AddTaskOrTodoList
}

//const callback =  action('btn add was pressed')

export const AddItemFormExample = (props: any) => {
    return <AddTaskOrTodoList addTodoList={() => {}} todoListOrAppStatus={'new'} kindForm={'todoList'}/>
}


export const AddItemFormDisabledExample = (props: any) => {
    return <AddTaskOrTodoList
        disabled={true}
        addTodoList={() => {}}
        todoListOrAppStatus={'new'}
        kindForm={'todoList'}
    />
}


