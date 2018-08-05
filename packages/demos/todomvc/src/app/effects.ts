export const say = {
  hello: (name: string) => ({ hello: `Hello ${name}` }),
}

export const api = {
  getPosts: () =>
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
      response.json()
    ),
}
