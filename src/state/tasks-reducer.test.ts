import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";

test('Task should be deleted', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const taskID = v1()

    const startTasks: TasksStateType = {
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: taskID, title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    }

    const endTasks = tasksReducer(startTasks, deleteTaskAC(taskID, todoListID1))

    expect(endTasks[todoListID1].length).toBe(2)
})

test('Task should be added', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const taskID = v1()

    const startTasks: TasksStateType = {
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: taskID, title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    }

    const endTasks = tasksReducer(startTasks, addTaskAC('titled', todoListID1))

    expect(endTasks[todoListID1].length).toBe(4)
    expect(endTasks[todoListID1][0].title).toBe('titled')
})

test('Task status should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const taskID = v1()

    const startTasks: TasksStateType = {
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: taskID, title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    }

    const endTasks = tasksReducer(startTasks, changeTaskStatusAC(taskID, todoListID1))

    expect(endTasks[todoListID1][1].isDone).toBe(false)
})


test('Task content should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const taskID = v1()

    const startTasks: TasksStateType = {
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: taskID, title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    }

    const endTasks = tasksReducer(startTasks, changeTaskTitleAC('aloha',taskID, todoListID1))

    expect(endTasks[todoListID1][1].title).toBe('aloha')
})