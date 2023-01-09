import Post from "./Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useEffect } from "react";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getAllPosts = () => {
    axios
      .get(`http://localhost:3001/posts`)
      .then((response) => {
        dispatch(setPosts({ posts: response.data }));
      })
      .catch((err) => {
        console.log("post ", err);
      });
  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          postUserId,
          postUsername,
          location,
          description,
          likes,
          comments,
          postPic,
          userPicture,
        }) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={postUserId}
            postUsername={postUsername}
            location={location}
            description={description}
            likes={likes}
            comments={comments}
            postPic={postPic}
            userPicture={userPicture}
          />
        )
      )}
    </>
  );
}

export default AllPosts;
