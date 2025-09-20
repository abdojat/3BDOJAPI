# 3BDOJAPI

A RESTful API built with Node.js, Express, and MongoDB, providing endpoints for managing articles, to-do lists, blog posts, and notes. This project is designed for learning, prototyping, and as a foundation for more complex applications.

## Features

- **Articles API**: Create, read, update, and delete articles.
- **To-Do List API**: Manage to-do items and custom lists.
- **Blog Posts API**: CRUD operations for blog posts.
- **Notes API**: Simple note-taking endpoints.
- **MongoDB Integration**: Uses Mongoose for schema modeling and database operations.
- **CORS Support**: Cross-origin requests enabled.
- **Environment Variables**: Secure configuration using `.env`.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/abdojat/3BDOJAPI.git
   cd 3BDOJAPI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB credentials:
   ```env
   USER_NAME=your_mongodb_username
   PASSWORD=your_mongodb_password
   ```

### Running the Application
Start the server with:
```sh
node app.js
```
The API will be available at `http://localhost:3000`.

## API Endpoints

### Articles
- `GET /articles` — List all articles
- `POST /articles` — Create a new article
- `DELETE /articles` — Delete all articles
- `GET /articles/:articleTitle` — Get a specific article
- `PUT /articles/:articleTitle` — Replace an article
- `PATCH /articles/:articleTitle` — Update part of an article
- `DELETE /articles/:articleTitle` — Delete a specific article

### To-Do List
- `GET /todolist` — List all to-do items
- `POST /todolist` — Add a new to-do item
- `DELETE /todolist` — Delete a to-do item
- `GET /todolist/:customListName` — Get or create a custom list
- `POST /todolist/:customListName` — Add item to a custom list
- `DELETE /todolist/:customListName` — Delete item from a custom list

### Blog Posts
- `GET /blogposts` — List all blog posts
- `POST /blogposts` — Create a new blog post
- `DELETE /blogposts` — Delete all blog posts
- `GET /blogposts/:wantedPostid` — Get a specific blog post
- `PUT /blogposts/:wantedPostid` — Replace a blog post
- `PATCH /blogposts/:wantedPostid` — Update part of a blog post
- `DELETE /blogposts/:wantedPostid` — Delete a specific blog post

### Notes
- `GET /notes` — List all notes
- `POST /notes` — Create a new note
- `DELETE /notes` — Delete a note

## Environment Variables
- `USER_NAME`: MongoDB username
- `PASSWORD`: MongoDB password

## Dependencies
- express
- mongoose
- mongodb
- body-parser
- cors
- dotenv
- lodash
- express-session
- passport
- passport-google-oauth20
- passport-local-mongoose
- mongoose-findorcreate

## License

This project is licensed under the ISC License.
