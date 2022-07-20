import React, { useEffect } from "react";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts, getAllUsers } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();

    const { loading, posts, error } = useSelector(
        (state) => state.postOfFollowing
    );

    const { users, loading: usersLoading } = useSelector(
        (state) => state.allUsers
    );

    const { error: likeError, message } = useSelector((state) => state.like);

    useEffect(() => {
        dispatch(getFollowingPosts());
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (likeError) {
            toast.error(likeError);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [error, message, likeError, dispatch]);

    return loading === true || usersLoading === true ? (
        <Loader />
    ) : (
        <div className="home">
            <div className="homeleft">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                        />
                    ))
                ) : (
                    <Typography variant="h6">No posts yet</Typography>
                )}
            </div>
            <div className="homeright">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <User
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    ))
                ) : (
                    <Typography>No Users Yet</Typography>
                )}
            </div>
        </div>
    );
};

export default Home;
