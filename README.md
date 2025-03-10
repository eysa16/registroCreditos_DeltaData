# Herramienta de Registro de Créditos

Esta es una aplicación web construida con **Python (Flask) y SQLite** para registrar créditos otorgados, visualizar los datos en una tabla y generar gráficos con **Matplotlib**.

<br>

## 🚀 Características principales:

- Registrar créditos mediante un formulario con validaciones en el frontend.

- Almacenar la información en una base de datos SQLite.

- Visualizar los créditos en una tabla interactiva.

- Mostrar una gráfica con la distribución de créditos usando Chart.js y Matplotlib.

- Actualización en tiempo real de la gráfica al agregar nuevos créditos.


<br>

## 📂 Tecnologías Utilizadas

- **Backend**: Flask (API y servidor web).
- **Base de Datos**: SQLite.
- **Frontend**: HTML, CSS y JavaScript.
- **Gráficos**: Matplotlib (generación de imagen PNG).


<br>

## 🛠 Requisitos

- Python 3.8+
- Flask
- Flask-SQLAlchemy
- SQLite
- Matplotlib


<br>

## 🖥️ Uso de la Aplicación

- **Registrar un Crédito**: Completa el formulario y haz clic en "Registrar Crédito".
  
- **Ver Créditos**: La tabla se actualiza automáticamente.
  
- **Editar un Crédito**: Haz clic en "Editar", ingresa nuevos valores y confirma cada uno de ellos.
  
- **Eliminar un Crédito**: Haz clic en "Eliminar" y confirma.
  
- **Ver gráfico de créditos**: El gráfico se actualiza automáticamente después de cada operación.


<br>

## 📂 Estructura del Proyecto
```
registro_DeltaData/
│── static/
│   ├── css 
│       ├── main.css 
│   ├── js
│       ├── main.js 
│       ├── grafico.js 
│── templates/
│   ├── index.html
│── instance/
│   ├── database.db 
│── app.py
│── requirements.txt
```

<br>

## 🛠 Instalación y Configuración

### 1️⃣ Clonar el Repositorio
```
git clone https://github.com/eysa16/creditos_DeltaData.git
cd creditos_DeltaData
```

### 2️⃣ Crear un Entorno Virtual
```
python -m venv creditos
source creditos/bin/activate  # En Mac/Linux
creditos\Scripts\activate     # En Windows
```

### 3️⃣ Instalar Dependencias
```
pip install -r requirements.txt
```

### 4️⃣ Ejecutar la Aplicación
Primeramente se ejecuta Flask mediante el siguiente comando:
```
python app.py
```

Una vez realizados los pasos anteriores, la aplicación estará disponible en: http://127.0.0.1:5000

<br>

## 📌 API - Endpoints

Brevemente se enlistan las diferentes operaciones CRUD que se pueden realizar sobre nuestra API creada en Flask.

| Método | Ruta | Descripción |
|----------|----------|----------|
| `GET`   | http://127.0.0.1:5000/creditos   | Se obtienen todos los créditos registrados   |
| `GET`   | http://127.0.0.1:5000/creditos/id   | Se obtienen un crédito (Necesitas el ID del cliente)   |
| `POST`    | http://127.0.0.1:5000/creditos   | Se registra un crédito   |
| `PUT`    | http://127.0.0.1:5000/creditos/id   | Se actualiza un crédito (Necesitas el ID del cliente)   |
| `DELETE`    | http://127.0.0.1:5000/creditos/id   | Se elimina un crédito (Necesitas el ID del cliente)  |

> [!TIP]
> Puedes hacer uso de la herramienta POSTMAN para probar las diferentes rutas CRUD

<br>

## 🔍 Validaciones del Formulario

El formulario en el frontend tiene validaciones para evitar datos incorrectos:

- **Campos obligatorios**: No se permite dejar campos vacíos.
- **Monto positivo**: El monto debe ser mayor a cero.
- Tasa de interés entre 0 y 100.
- Plazo en meses mayor a 0.
- Fecha de otorgamiento válida (formato YYYY-MM-DD).

Si hay errores, se muestran alertas para que el usuario corrija los datos antes de enviarlos.


<br>

## 📊 Visualización de Datos
🔹 Gráfica con Matplotlib

Genera una imagen `grafica.png` con Matplotlib que muestra:
- Total de créditos otorgados.
- Distribución de créditos por cliente.
  
Esta se muestra en la interfaz creada para el Frontend.

<br>

## 📧 Contacto
📌 Autor: Erik Yoel Santana Apreza <br>
📌 Email: erik.santana.apreza@gmail.com <br>
📌 GitHub: github.com/eysa16
