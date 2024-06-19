# dermafie-be

Backend Repository and API Documentation for the Dermafie application. Created using express.js framework from Node.js

# Endpoints
## User

Backend endpoints for register, login, and other user function.

### Register

Registers a new user by creating an account with the provided name, email, and password.

- URL : /users/register
- Method : POST
- Request Body :

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "secret"
}
```

- Response :

```json
{
  "message": "Successfully created user",
  "error_code": 0
}
```

### Login

Authenticates a user with their email and password, and generate a token if the corresponding data is valid.

- URL : /users/login
- Method : POST
- Request Body :

```json
{
  "email": "john.doe@example.com",
  "password": "secret"
}
```

- Response :

```json
{
  "message": "Successfully logged in",
  "data": {
    "user": "866a117f-6fac-4614-be8d-b8eaa8f4f386",
    "name": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NmExMTdmLTZmYWMtNDYxNC1iZThkLWI4ZWFhOGY0ZjM4NiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTc1MjU3OTEsImV4cCI6MTcxNzYxMjE5MX0.tJcazpXq7SR1tBrkvPWFEqQ_F7v6zFXpA5bEA4z3Tt4"
  },
  "error_code": 0
}
```

### Profile

Getting the data of the authenticated user.

- URL : /users/profile
- Method : GET
- Authentication (Token Bearer) :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NmExMTdmLTZmYWMtNDYxNC1iZThkLWI4ZWFhOGY0ZjM4NiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTc1MjU3OTEsImV4cCI6MTcxNzYxMjE5MX0.tJcazpXq7SR1tBrkvPWFEqQ_F7v6zFXpA5bEA4z3Tt4"
}
```

- Response :

```json
{
  "message": "User found",
  "data": {
    "id": "866a117f-6fac-4614-be8d-b8eaa8f4f386",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "profilepic": null
  },
  "error_code": 0
}
```

### Upload Profile Picture

Upload profile picture for the authenticated user.

- URL : /users/profile
- Method : PUT
- Authentication (Token Bearer) :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NmExMTdmLTZmYWMtNDYxNC1iZThkLWI4ZWFhOGY0ZjM4NiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTc1MjU3OTEsImV4cCI6MTcxNzYxMjE5MX0.tJcazpXq7SR1tBrkvPWFEqQ_F7v6zFXpA5bEA4z3Tt4"
}
```

- Form Data :

```json
{
  "profile_picture": img.jpg/jpeg/png (file)
}
```

- Response :

```json
{
  "message": "Profile picture uploaded successfully",
  "data": {
    "profile_picture": "https://storage.googleapis.com/dermafie-profile-test/profile_picture_866a117f-6fac-4614-be8d-b8eaa8f4f376.jpg"
  },
  "error_code": 0
}
```

## Main Feature

Backend endpoints for the main feature, such as analyzing picture using the Machine Learning Model, and Getting the analyze history data.

### Analyze

Endpoint to post a picture and getting the classification result.

- URL : /analyze
- Method : POST
- Authentication (Token Bearer) :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NmExMTdmLTZmYWMtNDYxNC1iZThkLWI4ZWFhOGY0ZjM4NiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTc1MjU3OTEsImV4cCI6MTcxNzYxMjE5MX0.tJcazpXq7SR1tBrkvPWFEqQ_F7v6zFXpA5bEA4z3Tt4"
}
```

- Form Data :

```json
{
  "image": img.jpg/jpeg/png (file)
}
```

- Response :

```json
{
    "message": "Analysis complete",
    "data": {
        "prediction": "Healthy Skin",
        "probability": 0.5981177687644958,
        "imageURL": "https://storage.googleapis.com/dermafie-bucket/imageAnalysis/image_1718778880933_d866da6d-cadb-4b55-8be8-64aaee179e31.jpg",
        "disease": {
            "name": "Healthy Skin",
            "description": "Your facial skin is healthy and does not show signs of irritation or disease, keep it up",
            "effects": "-",
            "solution": "To maintain healthy skin, regular cleansing, moisturizing, sun protection (using SPF), a balanced diet, staying hydrated, and avoiding harmful habits like smoking are recommended."
        }
    },
    "error_code": 0
}
```

### History

Endpoint to get the history of the past result.

- URL : /analyze/history
- Method : GET
- Authentication (Token Bearer) :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NmExMTdmLTZmYWMtNDYxNC1iZThkLWI4ZWFhOGY0ZjM4NiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTc1MjU3OTEsImV4cCI6MTcxNzYxMjE5MX0.tJcazpXq7SR1tBrkvPWFEqQ_F7v6zFXpA5bEA4z3Tt4"
}
```

- Response :

```json
{
    "message": "Fetch history complete",
    "data": [
        {
            "id": 47,
            "scanDate": "2024-06-19T06:34:47.000Z",
            "scanResult": "Healthy Skin",
            "imageURL": "https://storage.googleapis.com/dermafie-bucket/imageAnalysis/image_1718778880933_d866da6d-cadb-4b55-8be8-64aaee179e31.jpg",
            "createdAt": "2024-06-19T06:34:47.000Z",
            "updatedAt": "2024-06-19T06:34:47.000Z",
            "disease": {
                "name": "Healthy Skin",
                "description": "Your facial skin is healthy and does not show signs of irritation or disease, keep it up",
                "effects": "-",
                "solution": "To maintain healthy skin, regular cleansing, moisturizing, sun protection (using SPF), a balanced diet, staying hydrated, and avoiding harmful habits like smoking are recommended."
            }
        }
    ],
    "error_code": 0
}
```
