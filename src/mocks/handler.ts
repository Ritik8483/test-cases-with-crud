import { rest } from "msw";

// const posts:any = [
//   { id: 1, title: "Post 1", body: "Body of Post 1" },
//   { id: 2, title: "Post 2", body: "Body of Post 2" },
// ];

const apiUrl = "https://jsonplaceholder.typicode.com";

export const handlers = [
  rest.get(`${apiUrl}/posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: "Post 1", body: "Body of Post 1" },
        { id: 2, title: "Post 2", body: "Body of Post 2" },
      ])
    );
  }),

  rest.post(`${apiUrl}/posts`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ id: 101, title: "New Post", body: "This is a new post." })
    );
  }),

  rest.delete(
    "https://jsonplaceholder.typicode.com/posts/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      return res(ctx.status(200), ctx.json({}));
    }
  ),

  rest.put('https://jsonplaceholder.typicode.com/posts/:id', (req, res, ctx) => {
      const { id } = req.params;
      const { title, body }:any = req.json();
      const updatedPost = { id, title, body };
      return res(ctx.status(200), ctx.json(updatedPost));
    })
];
