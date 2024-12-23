## Registro //auth de nuestro proyecto 

-entra a el formulario de registro donde ingresara sus datos
    -nombre
    -mail
    -contraseña

- el front enviara este formulario (fetch) a nuestro servidor (endpoint: /api/auth/register)

-el backend validara los datos y si todo esta bien enviara al email registrado un mail de verificacion
    - 1 validar los datos que vienen del formulario
    - 1.1 validar que ese email no exista en mi db
    - 2 crear un token de validacion de mail firmado con una clase secreta desde nuestro backend y lo enviara al mail del usuario
    - 3 se va a encriptar la contraseña y se guardara en la db
    - 4 guardo el usuario en la db
    - 5 respondo al front end