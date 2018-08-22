export const api = {
  getPost(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
      (response) => response.json()
    )
  },
  getUser(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
      (response) => response.json()
    )
  },
}
