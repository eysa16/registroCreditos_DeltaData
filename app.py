from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')  # Usa un backend sin interfaz gráfica
import matplotlib.pyplot as plt
import io
import base64


app = Flask(__name__)
CORS(app)  # Permite solicitudes desde el frontend


# Configuración de la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


# Modelo de la base de datos
class Credito(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    monto = db.Column(db.Float, nullable=False)
    tasa_interes = db.Column(db.Float, nullable=False)
    plazo = db.Column(db.Integer, nullable=False)
    fecha_otorgamiento = db.Column(db.String(10), nullable=False)


# Crear la base de datos
with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return render_template('index.html')


# Rutas CRUD
@app.route("/creditos", methods=["POST"])
def agregar_credito():
    data = request.get_json()
    nuevo_credito = Credito(
        cliente=data["cliente"],
        monto=data["monto"],
        tasa_interes=data["tasa_interes"],
        plazo=data["plazo"],
        fecha_otorgamiento=data["fecha_otorgamiento"]
    )
    db.session.add(nuevo_credito)
    db.session.commit()
    return jsonify({"mensaje": "Crédito registrado correctamente"}), 201


@app.route("/creditos", methods=["GET"])
def obtener_creditos():
    creditos = Credito.query.all()
    lista_creditos = [
        {
            "id": c.id,
            "cliente": c.cliente,
            "monto": c.monto,
            "tasa_interes": c.tasa_interes,
            "plazo": c.plazo,
            "fecha_otorgamiento": c.fecha_otorgamiento,
        }
        for c in creditos
    ]
    return jsonify(lista_creditos)


@app.route("/creditos/<int:id>", methods=["GET"])
def obtener_credito(id):
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({"mensaje": "Crédito no encontrado"}), 404
    return jsonify({
        "id": credito.id,
        "cliente": credito.cliente,
        "monto": credito.monto,
        "tasa_interes": credito.tasa_interes,
        "plazo": credito.plazo,
        "fecha_otorgamiento": credito.fecha_otorgamiento,
    })


@app.route("/creditos/<int:id>", methods=["PUT"])
def actualizar_credito(id):
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({"mensaje": "Crédito no encontrado"}), 404

    data = request.get_json()
    credito.cliente = data["cliente"]
    credito.monto = data["monto"]
    credito.tasa_interes = data["tasa_interes"]
    credito.plazo = data["plazo"]
    credito.fecha_otorgamiento = data["fecha_otorgamiento"]
    
    db.session.commit()
    return jsonify({"mensaje": "Crédito actualizado correctamente"})


@app.route("/creditos/<int:id>", methods=["DELETE"])
def eliminar_credito(id):
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({"mensaje": "Crédito no encontrado"}), 404

    db.session.delete(credito)
    db.session.commit()
    return jsonify({"mensaje": "Crédito eliminado correctamente"})


@app.route("/app")
def frontend():
    return render_template("index.html")


@app.route("/grafico")
def generar_grafico():
    creditos = Credito.query.all()
    if not creditos:
        return jsonify({"mensaje": "No hay créditos registrados"}), 404

    
    # Organizar datos
    clientes = {}
    for c in creditos:
        clientes[c.cliente] = clientes.get(c.cliente, 0) + c.monto

    nombres = list(clientes.keys())
    montos = list(clientes.values())

    
    # Generación de gráfica con matplotlib
    plt.figure(figsize=(8, 4))
    plt.bar(nombres, montos, color="skyblue")
    plt.xlabel("Clientes")
    plt.ylabel("Total Créditos ($)")
    plt.title("Total de Créditos por Cliente")
    plt.xticks(rotation=45)

    
    # Guardado de imagen en memoria
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    plt.close()

    
    # Conversión a base64
    img_base64 = base64.b64encode(img.getvalue()).decode("utf-8")
    return jsonify({"imagen": f"data:image/png;base64,{img_base64}"})


print(app.url_map)

if __name__ == "__main__":
    app.run(debug=True)