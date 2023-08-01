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
    await waitFor(() => {
      const post1 = screen.queryAllByText(/Post 1/i);
      expect(post1[0]).toBeInTheDocument();
    });
  });

  xit("renders Submit btn and post data api", async () => {
    render(<PostList />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    const newPostElement = await screen.findByRole("heading", {
      name: /New Post/i,
    });
    expect(newPostElement).toBeInTheDocument();
  });

  xit("renders delete btn and delete api data", async () => {
    render(<PostList />);
    await waitFor(() => {
      const post1 = screen.queryAllByText(/Post 1/i);
      expect(post1[0]).toBeInTheDocument();
    });
    const deleteButtons = screen.queryAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBeGreaterThan(0);
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      const deletedPostTitle = screen.queryByText("Post 1");
      expect(deletedPostTitle).toBeNull();
    });
  });

  xit("renders update btn and update api data", async () => {
    render(<PostList />);
    await waitFor(() => {
      const post1 = screen.queryAllByText(/Post 1/i);
      expect(post1[0]).toBeInTheDocument();
    });
    const updateButtons = screen.queryAllByRole("button", { name: /update/i });
    expect(updateButtons.length).toBeGreaterThan(0);
    fireEvent.click(updateButtons[0]);
    const updatedPostTitle = await screen.findByRole("heading", {
      name: /Updated Post/i,
    });
    expect(updatedPostTitle).toBeInTheDocument();
  });

  it("render ERROR", async () => {
    render(<PostList />);
    const error = await screen.findByText(/Error fetching posts/i);
    expect(error).toBeInTheDocument();
  });
});
