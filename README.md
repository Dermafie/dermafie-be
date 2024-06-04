# dermafie-be

## User

### Register

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
