## API Routes

### Authentication

* **Login**

Method: `POST`

Route:
```
/auth/login
```

Request Body:
```json
{
    "username": "admin",
    "password": "............"
}
```

Response Body: `ON SUCCESS`
```json
{
    "status": 200,
    "message": "Login user sucessfully",
    "data": {
        "id": "1",
        "names": "David",
        "surnames": "Marcelo",
        "username": "admin",
        "charge": {
            "id": "1",
            "description": "Admin"
        },
        "role": {
            "id": "1",
            "description": "Admin"
        },
        "mail": "admin@mail.com",
        "phone": "",
        "accessToken": "",
        "refreshToken": "",
    }
}
```