import {
    AddTodoListTypeAC,
    ChangeFilterValueTypeAC,
    ChangeTodoListNameTypeAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListType} from "../App";

test('todoList\'s name should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListNameTypeAC(todoListID2, 'Tratata'))

    expect(endState[1].title).toBe('Tratata')
})

test('todoLists length should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodoListTypeAC('Trads'))

    expect(endState.length).toBe(3)
})

test('certain TodoList should be deleted', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
})

test('certain TodoList filter value should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeFilterValueTypeAC(todoListID1, 'completed'))

    expect(endState[0].filter).toBe('completed')
})