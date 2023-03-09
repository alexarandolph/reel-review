# **Movies**

### **Get list of Movies**

- Endpoint path: /api/movies/{title}
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: A list of movies
- Response Shape (JSON):
  ```
  [
  {
  "movie_id": int,
  "title": "string",
  "poster_path": "string",
  "vote_average": int
  }
  ]
  ```

### **Detail of a Movie**

- Endpoint path: /api/movies/{id}
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: Details of a Specific Movie
- Response Shape (JSON):
  ```
  {
  "movie_id": int,
  "title": "string",
  "poster_path": "string",
  "runtime": int,
  "vote_average": float,
  "overview": "string",
  "trailer": "string"
  }
  ```

### **Get list of Trending Movies**

- Endpoint path: /api/movies/trending
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: A list of movies
- Response Shape (JSON):
  ```
  [
  {
  "movie_id": int,
  "title": "string",
  "poster_path": "string",
  "vote_average": float
  }
  ]
  ```

# Review

### **Create a Review**

- Endpoint path: /api/reviews/create
- Endpoint method: POST
- Headers:
  - Authorization: Bearer token
- Request Shape (JSON):

  ```
  {
  "movie_id": int,
  "display_name": "string",
  "rating": float,
  "comments": "string"
  }
  ```

- Endpoint path: /api/reviews/create
- Endpoint method: POST
- Headers:
  - Authorization: Bearer token
- Request Shape (JSON):
  {
  "movie_id": int,
  "display_name": "string",
  "rating": float,
  "comments": "string",
  "id": int
  }

### **Update a Review**

- Endpoint path: /api/reviews/{review_id}
- Endpoint method: PUT
- Headers:
  - Authorization: Bearer token
- Request Shape (JSON):
  ```
  {
  "movie_id": int,
  "display_name": "string",
  "rating": float,
  "comments": "string"
  }
  ```
- Headers:
  - Authorization: Bearer token
- Response: Updates field/fields of a review
- Response Shape (JSON):
  ```
  {
  "movie_id": int,
  "display_name": "string",
  "rating": float,
  "comments": "string",
  "id": int
  }
  ```

### **Delete a Review**

- Endpoint path: /api/reviews/{review_id}
- Endpoint method: DELETE
- Headers:
  - Authorization: Bearer token
- Response: Deletes a Review
- Response Shape (JSON):
  ```
  204 	Successful Response
  ```

### **Get a list of Reviews**

- Endpoint path: /api/reviews
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: Gets a list of reviews
- Response Shape (JSON):
  ```
  [
  {
    "movie_id": int,
    "display_name": "string",
    "rating": float,
    "comments": "string",
    "id": int
  }
  ]
  ```

### \*Get a Review\*\*

- Endpoint path: /api/reviews/{review_id}
- Endpoint path: GET
- Headers:
  - Authorization: Bearer token
- Response: Gets a single Review
- Response Shape (JSON):
  ```
  {
  "movie_id": int,
  "display_name": "string",
  "rating": float,
  "comments": "string",
  "id": int
  }
  ```

# Account

### **Log In**

- Endpoint path: /token
- Endpoint method: POST
- Request Shape (JSON):

  ```
  {
   username: str,
   password: str,
  }

  ```

- Headers:
  - Authorization: Bearer token
- Response: Logs the user in allowing access to features requiring token
- Response Shape (JSON):
  ```
  {
  "access_token": "string",
  "token_type": "Bearer"
  }
  ```

### **Log Out**

- Endpoint path: /token
- Endpoint method: DELETE
- Headers:
  - Authorization: Bearer token
- Response: Logs the user out of their account removing access from features that require token
- Response Shape (JSON):
  ```
  {
     "true"
  }
  ```

### **Get Token**

- Endpoint path: /token
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: Display the logged in users details on the page.
- Response Shape (JSON):

```
  {
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
  "id": int,
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "email": "string"
  }
  }
```

### **Sign Up**

- Endpoint path: /api//accounts
- Endpoint method: POST
- Request Shape (JSON):
  ```
  {
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
  }
  ```
- Response: Creates a new account
- Response Shape (JSON):
  ```
  {
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": int,
    "first_name": "string",
    "last_name": "string",
    "username": "string",
    "email": "string"
  }
  }
  ```
