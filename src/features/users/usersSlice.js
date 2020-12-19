const initialState = [
    {
        "id": 1,
        "first_name": "Vallie",
        "last_name": "Boden",
        "email": "vboden0@wikipedia.org",
        "birthday": "5/12/2010",
        "phone": "635-117-3162"
    }, {
        "id": 2,
        "first_name": "Theresa",
        "last_name": "Piscotti",
        "email": "tpiscotti1@bravesites.com",
        "birthday": "4/14/2001",
        "phone": "958-579-0930"
    }, {
        "id": 3,
        "first_name": "Antoni",
        "last_name": "Chappelow",
        "email": "achappelow2@alexa.com",
        "birthday": "5/27/2008",
        "phone": "545-996-3923"
    }
]

function nextUserId(users) {
    const maxId = users.reduce((maxId, user) => Math.max(user.id, maxId), -1)
    return maxId + 1
}

// Use the initialState as a default value
export default function usersReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {

        // Do something here based on the different types of actions
        case 'users/userAdded': {
            // We need to return a new state object
            return [
                // that has all the existing state data
                // but has a new array for the `users` field
                // with all of the old users
                ...state,

                // and the new user object
                {
                    // new user object as payload
                    ...action.payload,

                    // Use an auto-incrementing numeric ID for this example
                    id: nextUserId(state),


                }
            ]
        }

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
