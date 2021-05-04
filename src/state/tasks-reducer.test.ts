import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, DeleteTaskAC} from "./tasks-actions";

test('task should be deleted', () => {
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

    const endTasks = tasksReducer(startTasks, DeleteTaskAC(taskID, todoListID1))

    expect(endTasks[todoListID1].length).toBe(2)
})

test('task should be added', () => {
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

    const endTasks = tasksReducer(startTasks, AddTaskAC('titled', todoListID1))

    expect(endTasks[todoListID1].length).toBe(4)
    expect(endTasks[todoListID1][0].title).toBe('titled')
})

test('task status should be changed', () => {
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

    const endTasks = tasksReducer(startTasks, ChangeTaskStatusAC(taskID, todoListID1))

    expect(endTasks[todoListID1][1].isDone).toBe(false)
})


test('task content should be changed', () => {
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

    const endTasks = tasksReducer(startTasks, ChangeTaskTitleAC('aloha',taskID, todoListID1))

    expect(endTasks[todoListID1][1].title).toBe('aloha')
})