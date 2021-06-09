import {addTaskAC, deleteTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../API/api";

export let startTasksState: TasksStateType

beforeEach(() => {
    startTasksState = {
        'todoListId1': [
            {
                description: '',
                title: 'first task',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'second task',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: ''
            },
        ],
        'todoListId2': [
            {
                description: '',
                title: 'first task in second todoList',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '11',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'second task in second todoList',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '22',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: ''
            },
        ],
    }
})

test('Task should be deleted', () => {
    const endTasks = tasksReducer(startTasksState, deleteTaskAC('1', 'todoListId1'))

    expect(endTasks['todoListId1'].length).toBe(1)
})

test('Task should be added', () => {
    const task = {
        description: '',
        title: 'first of the first',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id: '111',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
    }

    const endTasks = tasksReducer(startTasksState, addTaskAC(task))

    expect(endTasks['todoListId1'].length).toBe(3)
    expect(endTasks['todoListId1'][0].title).toBe('first of the first')
})

test('Task status should be changed', () => {
    const apiModel = {
        title: 'first task',
        description: '',
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: ''
    }

    const endTasks = tasksReducer(startTasksState, updateTaskAC('todoListId1', '1', apiModel))

    expect(endTasks['todoListId1'][0].status).toBe(2)
})


test('Task content should be changed', () => {
    const apiModel = {
        title: 'first task changed',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: ''
    }

    const endTasks = tasksReducer(startTasksState, updateTaskAC('todoListId1', '1', apiModel))

    expect(endTasks['todoListId1'][0].title).toBe('first task changed')
})