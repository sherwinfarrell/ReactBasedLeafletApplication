import authReducer from "../reducers/authReducer"


describe("Auth Reducer",() =>{
    it('It should return default case as null',()=>{
        const defaultState = authReducer({},{})
        expect(defaultState).toEqual({});
    })

    it("It should return the login error",()=>{
        let action = {type: "LOGIN_ERROR"}
        const defaultState = authReducer({},action)
        expect(defaultState.authError).toEqual("login failed");
    })

    it("It should return the login success error as null",()=>{
        let action = {type: "LOGIN_SUCCESS", err:{message:"error"}}
        const defaultState = authReducer({},action)
        console.log(defaultState)
        expect(defaultState.authError).toBeNull();
    })

    it("It should return the signup error",()=>{
        let action = {type: "SIGNUP_ERROR", err:{message:"error"}}
        const defaultState = authReducer({},action)
        console.log(defaultState)
        expect(defaultState.authError).toEqual("error");
    })

    it("It should return the auth error as null",()=>{
        let action = {type: "SIGNUP_SUCCESS", err:{message:"error"}}
        const defaultState = authReducer({},action)
        console.log(defaultState)
        expect(defaultState.authError).toBeNull();
    })

    it("It should return the Sign out error as auth error, error",()=>{
        let action = {type: "SIGNOUT_ERROR", err:{message:"error"}}
        const defaultState = authReducer({},action)
        console.log(defaultState)
        expect(defaultState.authError).toEqual("error");
    })


    it("It should return the Signout out success auth error as null",()=>{
        let action = {type: "SIGNOUT_SUCCESS", err:{message:"error"}}
        const defaultState = authReducer({},action)
        console.log(defaultState)
        expect(defaultState.authError).toBeNull();
    })


})