export const createTask = (task) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {


        console.log(task)
        // async code to the database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const ref = firestore.collection("my_collection").doc();
        let myId = ref.id;

        console.log(firestore)


        firestore.collection('tasks').add({
            ...task,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
            uid: myId
        }).then(() => {
            console.log("It added task")
            dispatch({type: 'CREATE_Task', task})
        }).catch((err) => {
            console.log("It did not add task")
            dispatch({type: 'CREATE_TASK_ERROR', err})
        });
    }
};

export const deleteTask = (task) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // async code to the database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        const id = task.id;
        firestore.collection('tasks').doc(id).delete()
    }
};


export const initiateTaskEnd = (disaster, task) =>{
    return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const update = {};
    update['status'] = "DisasterEnded";


    firestore.collection('tasks').doc(task.id).update(update).then(() => {
      dispatch({ type: "TERMINATED_TASK", task });

    })
    .catch(err => {
        console.log("there was an error")
        console.log(err)
      dispatch({ type: "TERMINATED_TASK_ERROR", err });
    });;
    }
}