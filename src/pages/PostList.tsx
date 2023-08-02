import axios from "axios";
import React, { useEffect, useState } from "react";

const apiUrl = "https://jsonplaceholder.typicode.com";

const PostList = () => {
  const [posts, setPosts] = useState<any>([]);
  const [errors, setErrors] = useState<any>(null);

  const getFunc = async () => {
    // try {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/posts"
    //   );
    //   const json = await response.json();
    //   setPosts(json);
    // } catch (error) {
    //   setErrors("Error fetching posts")
    // }
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((json:any) => setPosts(json))
      .catch((error:any)=>setErrors("Error fetching posts"))
  };

  useEffect(() => {
    getFunc();
  }, []);

  const handleSubmit = async () => {
    try {
      const response: any = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "New Post",
          body: "This is a new post.",
          userId: 1, // You can set the userId as required by your API
        }
      );
      if (response?.data?.title?.length > 0) {
        setPosts([...posts, response?.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (userId: any) => {
    const updatedUser = {
      id: userId,
      title: "Updated Post Title",
      body: "Updated body of Post 1.",
    };
    const resp = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${userId}`,
      updatedUser
    );
    if (resp?.status === 200) {
      const filteredElement = posts?.filter(
        (item: any) => item?.id !== resp?.data?.id
      );
      setPosts([updatedUser, ...filteredElement]);
    }
  };

  const handleDeleteUser = async (userId: any) => {
    const resp = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${userId}`
    );
  };

  return (
    //     <div>
    //     <h1>Postlist</h1>
    //   <ul>
    //     {posts?.map((post: any) => (
    //       <li key={post?.id}>
    //         <h3>Title : {post?.title}</h3>
    //         <p>Body : {post?.body}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div>
      <h1>Postlist</h1>
      {errors && <p>{errors}</p>}
      {posts?.map((post: any) => (
        <div key={post?.id}>
          <h3>Title : {post?.title}</h3>
          <p>Body : {post?.body}</p>
          <button
            id={`delete_${post?.id}`}
            onClick={() => handleUpdateUser(post?.id)}
          >
            Update
          </button>
          <button onClick={() => handleDeleteUser(post?.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PostList;
