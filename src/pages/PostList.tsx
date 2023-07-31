import axios from "axios";
import React, { useEffect, useState } from "react";

const apiUrl = "https://jsonplaceholder.typicode.com";

const PostList = () => {
  const [posts, setPosts] = useState<any>([]);

  const getFunc = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getFunc();
  }, []);

  const handleSubmit = async () => {
    try {
      // Make a POST request to create a new post
      const response: any = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "New Post",
          body: "This is a new post.",
          userId: 1, // You can set the userId as required by your API
        }
      );
      console.log("response?.title?.length", response?.data?.title?.length);

      if (response?.data?.title?.length > 0) {
        // getFunc();
        setPosts([...posts, response?.data]);
      }
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
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
      console.log("filteredElement", filteredElement);

      setPosts([updatedUser, ...filteredElement]);
    }
    console.log("resp", resp);

    // setUsers((prevUsers: any) =>
    //   prevUsers.map((user: any) =>
    //     user.id === userId ? { ...user, ...updatedUser } : user
    //   )
    // );
  };

  const handleDeleteUser = async (userId: any) => {
    const resp = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${userId}`
    );
    console.log("resp", resp);

    // setUsers((prevUsers: any) =>
    //   prevUsers.filter((user: any) => user.id !== userId)
    // );
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
