import {addTodoListAC, deleteTodoListAC, todoListDomainType, todoListsReducer, TodoListType} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/api";
import {startTasksState} from "./tasks-reducer.test";

let startTodoListsState: Array<todoListDomainType>

beforeEach(() => {
    startTodoListsState = [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 2},
        {id: 'todoListId2', title: 'What I know', filter: 'all', addedDate: '', order: 2},
    ]
})

test('it\'s should be equals', () => {

    const todoList = {
        id: 'todoListId3',
        addedDate: '',
        title: 'its my third todoList',
        order: 3
    }

    const action = addTodoListAC(todoList)
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[2]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todoListId3')
    expect(idFromTodoLists).toBe('todoListId3')
})

test('property with todoListId should be deleted ', () => {

    const action = deleteTodoListAC('todoListId2')
    const endState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
})