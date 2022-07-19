import { configureStore } from "@reduxjs/toolkit";
import {
    userReducer,
    postOfFollowingReducer,
    allUsersReducer,
    userProfileReducer,
} from "./Reducers/User";
import { likeReducer, myPostReducer, userPostsReducer } from "./Reducers/Post";

// const initialState = {};
const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
    },
});

export default store;
