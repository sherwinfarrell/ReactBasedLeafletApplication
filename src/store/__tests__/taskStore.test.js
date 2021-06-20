import taskReducer from "../reducers/taskReducer"


describe("Tasks Reducer",() =>{
    it('It should return default task',()=>{
        const defaultState = taskReducer({},{})
        expect(defaultState).toEqual({});
    })

    it("It should return the new tasks that were added",()=>{
        let action = {type: "CREATE_TASK", task:"test"}
        const defaultState = taskReducer({},action)
        expect(defaultState).toEqual("test");
    })

    it("It should return the new tasks that were added",()=>{
        let action = {type: "CREATE_TASK_ERROR", err:"Error"}
        const defaultState = taskReducer({},action)
        expect(defaultState).toEqual("Error");
    })
    
    
    it("It should return the task when the task is terminated",()=>{
        let action = {type: "TERMINATED_TASK", task:"test"}
        const defaultState = taskReducer({},action)
        expect(defaultState).toEqual("test");
    })
    it("It should return error on failure when terminating a task",()=>{
        let action = {type: "TERMINATED_TASK_ERROR",  err:"Error"}
        const defaultState = taskReducer({},action)
        expect(defaultState).toEqual("Error");
    })
})