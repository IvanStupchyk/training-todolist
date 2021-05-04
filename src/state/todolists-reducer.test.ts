import {
    todoListsReducer, TodoListType
} from "./todolists-reducer";
import {v1} from "uuid";
import {AddTodoListAC, ChangeFilterValueAC, ChangeTodoListTitleAC, DeleteTodoListAC} from "./todolists-actions";

test('todoList\'s name should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListID2, 'Tratata'))

    expect(endState[1].title).toBe('Tratata')
})

test('todoLists length should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC('Trads'))

    expect(endState.length).toBe(3)
})

test('certain TodoList should be deleted', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, DeleteTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
})

test('certain TodoList filter value should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: "all"},
        {id: todoListID2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeFilterValueAC(todoListID1, 'completed'))

    expect(endState[0].filter).toBe('completed')
})