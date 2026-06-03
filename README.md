# Trabajo Final - Superheroes

Este es mi trabajo final del proyecto de superheroes. La idea fue terminar un sistema completo con backend y frontend, donde se pueda ver un catalogo de superheroes, iniciar sesion, registrar usuarios, guardar favoritos y tambien agregar nuevos heroes.

El proyecto quedo dividido en dos partes:

- Backend con Express, Knex y PostgreSQL.
- Frontend con Angular.

## Que hace el proyecto

Al abrir la pagina se puede ver un catalogo con 12 superheroes. Cada tarjeta muestra su nombre, poder, fortaleza, resistencia, debilidad e imagen.

Tambien se puede crear una cuenta, iniciar sesion y ya estando logueado se activan las opciones de favoritos y agregar heroes.

Las funciones principales que quedaron listas son:

- Ver catalogo de superheroes.
- Registrar usuarios.
- Iniciar y cerrar sesion.
- Agregar heroes a favoritos.
- Ver mis favoritos.
- Eliminar heroes de favoritos.
- Agregar un nuevo superheroe al catalogo.
- Rutas protegidas para que solo usuarios logueados puedan usar favoritos y agregar heroes.

## Como correrlo

Primero hay que tener la base de datos PostgreSQL lista con el nombre `superheroes`.

En la carpeta principal del proyecto se corre el backend:

```bash
npm install
npm run migrate
npm run seed
npm start
```

El backend queda corriendo en:

```text
http://localhost:3000
```

Luego se entra a la carpeta del frontend:

```bash
cd superheroe-frontend
npm install
npm start
```

El frontend queda corriendo en:

```text
http://127.0.0.1:4200
```

## Rutas principales

Estas son las rutas que se pueden probar en el navegador:

- `/catalog` para ver el catalogo.
- `/login` para iniciar sesion.
- `/user-registration` para registrar usuario.
- `/about` para ver informacion del proyecto.
- `/favoritos` para ver favoritos.
- `/add-hero` para agregar un nuevo heroe.

## Resultado final

El proyecto ya quedo funcionando completo. Se probo el backend, el frontend, las rutas, el login, el registro, favoritos y el alta de superheroes.

Tambien el catalogo quedo con 12 heroes para que se vea como una cuadricula de 4 columnas en pantalla grande, como se pidio en el trabajo de acuerdo al word que usted nos proporcionó. 
