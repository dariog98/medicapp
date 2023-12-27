## Rutas API

### Autenticación

* **Login**

Method: `POST`

Request Body:
```json
{
    "username": "nombre de usuario",
    "password": "constraseña de usuario"
}
```

Route:
```
/auth/login
```

Response Body: `ON SUCCESS`
```json
{
    "status": 200,
    "message": "Login user sucessfully",
    "data": {
        "id": "id de usuario",
        "names": "nombres del usuario",
        "surnames": "apellidos del usuario",
        "username": "nombre de usario",
        "charge": {
            "id": "id del cargo",
            "description": "descripción del cargo"
        },
        "role": {
            "id": "id del rol",
            "description": "descripción del rol"
        },
        "mail": "correo del usuario",
        "phone": "teléfono del usuario",
        "token": "token de acceso del usuario"
    }
}
```

### /register

Método POST

Recibe un body de tipo JSON con los siguientes datos 

{
    "name": "Nombre de la persona",
    "username": "nombre de usuario",
    "password": "contraseña",
    "idRole": "id del rol(entero)",
    "idCharge": "id del cargo(entero)",
}

### /login

Método POST

Recibe un body de tipo JSON con los siguientes datos 

{
    "username": "nombre de usuario",
    "password": "contraseña"
}

/patients 