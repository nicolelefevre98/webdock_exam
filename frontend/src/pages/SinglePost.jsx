import React, { useState, useEffect } from 'react';
import '/./src/styles/PostCard.scss';
import '/./src/styles/globals.scss';

import CreateComment from '../components/CreateComment';
import CommentCard from '../components/CommentCard';
import PostCard from '../components/PostCard';
import { useParams } from 'react-router-dom';
import BasicModal from '../components/Popup';
import { BeatLoader } from 'react-spinners';



const Post = () => {
  //loading useStates til loading
  const [postLoading, setPostLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  
  const [post, setPost] = useState(null); 
  const [comments, setComments] = useState([]); 
  const [users, setUsers] = useState([]); 
  const { id } = useParams('post/');

  useEffect(() => {
    setPostLoading(true);
    fetch(`http://217.78.237.62/post/${ id }`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.log('Error fetching data:', error));
      setPostLoading(false);
  }, []);

  useEffect(() => {
    setUsersLoading(true);
    fetch(`http://217.78.237.62/users/`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log('Error fetching data:', error));
      setUsersLoading(false);
  }, []);

  useEffect(() => {
    setCommentsLoading(true);
    fetch(`http://217.78.237.62/comments/`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log('Error fetching data:', error));
      setCommentsLoading(false);
  }, []);

  

  const user = post && users.find(user => user.userID === post.userID);
  const loggedInUser = users.find(user => user.email === localStorage.getItem("email"));
  const isAdmin = loggedInUser && loggedInUser.role === 'admin';
  const isLoggedIn = Boolean(localStorage.getItem("ssoToken"));

  return (
    <>
      {isAdmin && isLoggedIn && post ? <BasicModal id={post.postID} title={post.title} description={post.description} /> : <></>}
      {postLoading || usersLoading || commentsLoading ? ( 
        <BeatLoader color="#018647" />
      ) : ( 
        <>
          {post && user && (
            <PostCard 
              userName={user ? user.name : 'Unknown User'}
              userID={post.userID}
              avatar={ user.avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
              
              status={post.status}
              title={post.title}
              desc={post.description}
              date={post.createdAt}
              likes={post.likes} 
              />
          )}
          {isLoggedIn?<CreateComment/>:<p className="loggedOutText">Log in to comment on this post</p>}
          {comments.length > 0 && user && ( 
            comments.filter(comment => post && comment.postID === post.postID).map(comment => { 
              const commentUser = users.find(user => user.userID === comment.userID);
              return (
                <CommentCard
                  avatar={ user.avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
                  key={comment.commentID}
                  userName={commentUser ? commentUser.name : 'Unknown User'}
                  likes={comment.commentLikeAmount}
                  description={comment.description}
                />
              );
            })
          )}
        </>
      )}
    </>
  );
  
};

export default Post;
