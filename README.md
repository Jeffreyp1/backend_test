# API DOCUMENTATION
## SUMMARY
This backend application should enable blog management for posts and comments, including creating, retrieving, updating, and deleting. Creating, retrieving, updating, and deleting is supported for blog posts. As for comments, retrieving and creating is supported.

### Posts

- `GET /posts`: Retrieves all posts.
- `GET /posts/{id}`: Retrieves a specific post by ID.
- `POST /posts`: Makes new post. Requires several parameters including `title`, `content`, and `author` in the request body.
- `PUT /posts/{id}`: Updates the post with the ID. Requires `title`, `content`, and `author` in the request body
- `DELETE /posts/{id}`: Deletes a post with the ID in the parameter

### Comments

- `GET /posts/{postId}/comments`: Retrieves all comments for the specified post.
- `POST /posts/{postId}/comments`: Adds a new comment to the specified post. Requires `content` and `author` in the request body.


# Set-up
## Part 1
- Download and start PostgreSQL and ensure it's running
- Download and start pgAdmin4. Connect to PostgreSQL server and create new database named "blog"
- Create tables below:
       
      CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          author VARCHAR(255) NOT NULL
      );
      CREATE TABLE comments (
          id SERIAL PRIMARY KEY,
          postId INTEGER NOT NULL,
          content TEXT NOT NULL,
          author VARCHAR(255) NOT NULL,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      );
-Insert sample data:
      INSERT INTO comments (postId, content, author) VALUES 
      (1, 'Great post Alice!', 'John'),
      (1, 'Very Nice Alice!', 'Jeffrey');
      
      INSERT INTO comments (postId, content, author) VALUES 
      (2, 'Keep it up!', 'Alice'),
      (2, 'Good job John!', 'Jeffrey');
      
      INSERT INTO comments (postId, content, author) VALUES 
      (3, 'Good one Jeffrey!', 'Alice'),
      (3, 'Thanks for the post!', 'John')
## Part 2
- Clone this repository
- install dependencies in terminal 'npm install'
- set up db.js ( sample code is provided in the repository and may need to be modified). Replace user, host, database, password, and port as needed

## Part 3
- Run application by typing in terminal "node app.js"
- Copy-paste 'http://localhost:3000' to web browser of your choice

## Part 4
- Download and open Postman to configure and test request to API endpoints
- Verify responses in Postman to ensure that each individual API endpoints works as intended

## Final Part
- To ensure project works as intended, ensure to have all parts done
