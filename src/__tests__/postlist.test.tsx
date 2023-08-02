import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "../mocks/server";
import { rest } from "msw";
import PostList from "../pages/PostList";

describe.skip("User API tests", () => {
  //   it("renders a list of users", async () => {
  //     render(<PostList />);
  //     const textElement = screen.getByRole("heading", {
  //       name: "Postlist",
  //     });
  //     const users = await screen.findAllByRole("listitem");
  //     expect(users).toHaveLength(2);
  //     expect(textElement).toBeInTheDocument();
  //   });

  it("renders a list of users", async () => {
    render(<PostList />);
    const textElement = screen.getByRole("heading", {
      name: "Postlist",
    });
    expect(textElement).toBeInTheDocument();
    const post1 = await screen.findByText(/Body of dummy added/i);
    expect(post1).toBeInTheDocument();
    // const post1 = await screen.findAllByText(/Post 1/i);
    // expect(post1[0]).toBeInTheDocument();
    // await waitFor(() => {
    //   const post1 = screen.queryByText(/Body of dummy added/i);    //find element on the basis of body
    //   expect(post1).toBeInTheDocument();
    // });
    // await waitFor(() => {
    //   const post1 = screen.queryAllByText(/Post 1/i);
    //   expect(post1[0]).toBeInTheDocument();//as it contains 2 "Post 1"
    // });
  });

  it("renders Submit btn and post data api", async () => {
    render(<PostList />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    console.log("submitButton", submitButton);
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    // await waitFor(() => {
    //   const newPostElement = screen.getByRole("heading", {
    //     name: /New Post/i,
    //   });
    //   console.log("newPostElement", newPostElement);

    //   expect(newPostElement).toBeInTheDocument();
    // });
    const newPostElement = await screen.findByRole("heading", {
      name: /New Post/i,
    });
    console.log("newPostElement", newPostElement);
    expect(newPostElement).toBeInTheDocument();
  });

  it("renders delete btn and delete api data", async () => {
    render(<PostList />);
    // await waitFor(() => {
    //   const post1 = screen.queryAllByText(/Post 1/i);
    //   expect(post1[0]).toBeInTheDocument();
    // });
    const post1 = await screen.findByText(/Post 1/i);
    expect(post1).toBeInTheDocument();
    const deleteButtons = screen.queryAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBeGreaterThan(0);
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      const deletedPostTitle = screen.queryByText("Post 1");
      expect(deletedPostTitle).toBeNull();
    });
  });

  it("renders update btn and update api data", async () => {
    render(<PostList />);
    await waitFor(() => {
      const post1 = screen.queryAllByText(/Post 1/i);
      expect(post1[0]).toBeInTheDocument();
    });
    const updateButtons: any = screen.queryByRole("button", {
      name: /update/i,
    });
    fireEvent.click(updateButtons);
    const updatedPostTitle = await screen.findByRole("heading", {
      name: /Updated Post/i,
    }); 
    expect(updatedPostTitle).toBeInTheDocument();
  });

  xit("render ERROR", async () => {
    render(<PostList />);
    const textElement = screen.getByRole("heading", {
      name: "Postlist",
    });
    expect(textElement).toBeInTheDocument();
    const error = await screen.findByText(/Error fetching posts/i,{},{timeout:2000});
    expect(error).toBeInTheDocument();
  });
});
