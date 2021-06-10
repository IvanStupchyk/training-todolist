import {
    addTodoListAC, changeTodoListEntityStatusAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC,
    deleteTodoListAC,
    todoListDomainType,
    todoListsReducer
} from "./todolists-reducer";

let startTodoListsState: Array<todoListDomainType>

beforeEach(() => {
    startTodoListsState = [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 1, entityStatus: "new"},
        {id: 'todoListId2', title: 'What I know', filter: 'all', addedDate: '', order: 2, entityStatus: "addition"},
    ]
})


test('todoList\'s name should be changed', () => {
    const endState = todoListsReducer(startTodoListsState, changeTodoListTitleAC('todoListId1', 'Tratata'))

    expect(endState[0].title).toBe('Tratata')
})

test('todoLists length should be changed', () => {
    const todoList = {
        id: 'todoListId3',
        addedDate: '',
        title: 'its my third todoList',
        order: 3
    }

    const endState = todoListsReducer(startTodoListsState, addTodoListAC(todoList))

    expect(endState.length).toBe(3)
})

test('certain TodoList should be deleted', () => {
    const endState = todoListsReducer(startTodoListsState, deleteTodoListAC('todoListId2'))

    expect(endState.length).toBe(1)
})

test('certain TodoList filter value should be changed', () => {
    const endState = todoListsReducer(startTodoListsState, changeTodoListFilterValueAC('todoListId1', 'completed'))

    expect(endState[0].filter).toBe('completed')
})

test('certain TodoList status value should be changed', () => {
    const endState = todoListsReducer(startTodoListsState, changeTodoListEntityStatusAC('todoListId1', 'deletion'))

    expect(endState[0].entityStatus).toBe('deletion')
})

