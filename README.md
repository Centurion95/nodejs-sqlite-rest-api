# Nodejs + Sqlite REST API
Proyecto simple ejemplo de "Nodejs + Sqlite REST API", listo para clonar y modificar

Desarrollado en Linux (Debian10), VSCode

- Rodrigo Centurión
(Asunción, Paraguay)

## Clonar el proyecto y abrir desde VSCode
```sh
git clone https://github.com/Centurion95/nodejs-sqlite-rest-api.git
cd nodejs-sqlite-rest-api
code .
```

## Antes de ejecutar por primera vez, instalar las dependencias
```sh
npm i
```

## Ejecutar el proyecto
```sh
npm start
```

## Ejecutar el proyecto (en modo desarrollo)
```sh
npm run dev
```

## Instrucciones de uso
- Al ejecutar el proyecto, se crea automaticamente la BD "my_sqlite.db" en la carpeta raíz
- Tambien se crean las tablas "usuarios" y "notas", insertándose datos de ejemplo
- Importar a postman los archivos ".postman_collection" y ".postman_environment" de la carpeta raiz
- Ejecutar los requests para verificar la funcionalidad


## Acerca de
rc95 - 12/08/2022 01:01
- Se terminan los GET / POST / PATCH / DELETE
- Se actualizan los ".postman_collection" y ".postman_environment"

rc95 - 12/08/2022 00:09
- Reestructuración de carpetas, separación de funcionalidades
- Se agregan a la carpeta raíz:
    - .postman_collection
    - .postman_environment
- Cambios en el readme

rc95 - 11/08/2022 03:22
- Primera versión del proyecto
- Se agrega .gitignore
- Se implementa sqlite