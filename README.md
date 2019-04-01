# rest-api

## List of routes

| Route | HTTP | Header(s) | Body | Description |
| ----- | ---- | --------- | ---- | ----------- |
| `api/users` | GET | `token` | `none` | Get all the users info (**Admin only**) |
| `api/users/:id` | GET | `token` | `none` | Get a single user info (Admin and Authenticated user) |
| `api/users` | POST | `token` | `none` | Create a user (**Admin only**) |
| `api/users/:id` | DELETE | `token` | `none` | Delete a user (**Admin only**) |
| `api/users/:id` | PUT | `token` | `username:String`, `password:String`, `role:String` | Update a user with new info (Admin and Authenticated user) |
| `api/register` | POST | `none` |`username:String` (**Required**), `password:String` (**Required**), `role:String` (**Required**) | Register with new user info |
| `api/login` | POST | `none` | `username:String` (**Required**), `password:String` (**Required**) | Login and get an access token based in credentials |