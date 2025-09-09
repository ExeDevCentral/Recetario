from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import os
from pathlib import Path
import json

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'

# Configuración
RECETAS_DIR = Path.home() / "Recetas"
RECETAS_DIR.mkdir(exist_ok=True)

def contar_recetas(ruta):
    """Cuenta el total de recetas en todas las categorías"""
    contador = 0
    for txt in Path(ruta).glob("**/*.txt"):
        contador += 1
    return contador

def obtener_categorias():
    """Obtiene todas las categorías disponibles"""
    categorias = []
    if RECETAS_DIR.exists():
        for carpeta in RECETAS_DIR.iterdir():
            if carpeta.is_dir():
                categorias.append({
                    'nombre': carpeta.name,
                    'ruta': str(carpeta),
                    'recetas_count': len(list(carpeta.glob('*.txt')))
                })
    return categorias

def obtener_recetas(categoria_path):
    """Obtiene todas las recetas de una categoría"""
    recetas = []
    ruta_categoria = Path(categoria_path)
    if ruta_categoria.exists():
        for receta in ruta_categoria.glob('*.txt'):
            recetas.append({
                'nombre': receta.stem,
                'ruta': str(receta),
                'contenido': receta.read_text(encoding='utf-8')
            })
    return recetas

@app.route('/')
def index():
    """Página principal"""
    categorias = obtener_categorias()
    total_recetas = contar_recetas(RECETAS_DIR)
    return render_template('index.html', categorias=categorias, total_recetas=total_recetas)

@app.route('/categoria/<categoria>')
def ver_categoria(categoria):
    """Muestra las recetas de una categoría específica"""
    categoria_path = RECETAS_DIR / categoria
    if not categoria_path.exists():
        flash('La categoría no existe', 'error')
        return redirect(url_for('index'))
    
    recetas = obtener_recetas(categoria_path)
    return render_template('categoria.html', categoria=categoria, recetas=recetas)

@app.route('/receta/<categoria>/<receta>')
def ver_receta(categoria, receta):
    """Muestra una receta específica"""
    receta_path = RECETAS_DIR / categoria / f"{receta}.txt"
    if not receta_path.exists():
        flash('La receta no existe', 'error')
        return redirect(url_for('index'))
    
    contenido = receta_path.read_text(encoding='utf-8')
    return render_template('receta.html', categoria=categoria, receta=receta, contenido=contenido)

@app.route('/crear_categoria', methods=['GET', 'POST'])
def crear_categoria():
    """Crea una nueva categoría"""
    if request.method == 'POST':
        nombre_categoria = request.form['nombre_categoria']
        if not nombre_categoria:
            flash('El nombre de la categoría es requerido', 'error')
            return render_template('crear_categoria.html')
        
        nueva_categoria = RECETAS_DIR / nombre_categoria
        if nueva_categoria.exists():
            flash('La categoría ya existe', 'error')
            return render_template('crear_categoria.html')
        
        nueva_categoria.mkdir()
        flash(f'Categoría "{nombre_categoria}" creada exitosamente', 'success')
        return redirect(url_for('index'))
    
    return render_template('crear_categoria.html')

@app.route('/crear_receta', methods=['GET', 'POST'])
def crear_receta():
    """Crea una nueva receta"""
    if request.method == 'POST':
        categoria = request.form['categoria']
        nombre_receta = request.form['nombre_receta']
        contenido = request.form['contenido']
        
        if not all([categoria, nombre_receta, contenido]):
            flash('Todos los campos son requeridos', 'error')
            return render_template('crear_receta.html', categorias=obtener_categorias())
        
        receta_path = RECETAS_DIR / categoria / f"{nombre_receta}.txt"
        if receta_path.exists():
            flash('La receta ya existe en esta categoría', 'error')
            return render_template('crear_receta.html', categorias=obtener_categorias())
        
        receta_path.write_text(contenido, encoding='utf-8')
        flash(f'Receta "{nombre_receta}" creada exitosamente', 'success')
        return redirect(url_for('ver_categoria', categoria=categoria))
    
    return render_template('crear_receta.html', categorias=obtener_categorias())

@app.route('/editar_receta/<categoria>/<receta>', methods=['GET', 'POST'])
def editar_receta(categoria, receta):
    """Edita una receta existente"""
    receta_path = RECETAS_DIR / categoria / f"{receta}.txt"
    if not receta_path.exists():
        flash('La receta no existe', 'error')
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        nuevo_contenido = request.form['contenido']
        receta_path.write_text(nuevo_contenido, encoding='utf-8')
        flash('Receta actualizada exitosamente', 'success')
        return redirect(url_for('ver_receta', categoria=categoria, receta=receta))
    
    contenido_actual = receta_path.read_text(encoding='utf-8')
    return render_template('editar_receta.html', categoria=categoria, receta=receta, contenido=contenido_actual)

@app.route('/eliminar_receta/<categoria>/<receta>', methods=['POST'])
def eliminar_receta(categoria, receta):
    """Elimina una receta"""
    receta_path = RECETAS_DIR / categoria / f"{receta}.txt"
    if receta_path.exists():
        receta_path.unlink()
        flash(f'Receta "{receta}" eliminada exitosamente', 'success')
    else:
        flash('La receta no existe', 'error')
    
    return redirect(url_for('ver_categoria', categoria=categoria))

@app.route('/eliminar_categoria/<categoria>', methods=['POST'])
def eliminar_categoria(categoria):
    """Elimina una categoría"""
    categoria_path = RECETAS_DIR / categoria
    if categoria_path.exists():
        # Verificar si la categoría está vacía
        if any(categoria_path.iterdir()):
            flash('No se puede eliminar una categoría que contiene recetas', 'error')
        else:
            categoria_path.rmdir()
            flash(f'Categoría "{categoria}" eliminada exitosamente', 'success')
    else:
        flash('La categoría no existe', 'error')
    
    return redirect(url_for('index'))

@app.route('/api/recetas')
def api_recetas():
    """API endpoint para obtener todas las recetas"""
    todas_recetas = []
    for categoria in obtener_categorias():
        recetas = obtener_recetas(categoria['ruta'])
        for receta in recetas:
            receta['categoria'] = categoria['nombre']
            todas_recetas.append(receta)
    return jsonify(todas_recetas)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
