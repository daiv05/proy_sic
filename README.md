# Settings 

1. Ingresar a la carpeta django/ y crear el virtual environment

```sh
python -m venv env
```
2. Activar el virtual environment 
```sh
.\env\Scripts\activate
```
En el caso de querer desactivar
```sh
 deactivate
```
3. Instalar las dependencias
```sh
pip -r install .\requirements.txt 
```
4. Para correr django
```sh
py .\manage.py runserver       
```
Antes de correr las migraciones crear una base de datos con el nombre <strong>devapp</strong> con el usuario <strong>admin</strong> y contraseña <strong>admin</strong> en PostgreSQL

5. Correr migraciones
```sh
python manage.py makemigrations
python manage.py migrate
```

---
### Para levantar el frontend

```sh
cd django/frontend
```
```sh
npm install
```
```sh
npm run start
```


