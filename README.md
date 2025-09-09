# 🍳 Mi Recetario - Web App

Una aplicación web moderna para gestionar y organizar recetas de cocina, desarrollada con Flask y Bootstrap.

## ✨ Características

- **📁 Gestión de Categorías**: Organiza tus recetas por tipo de comida
- **📖 CRUD de Recetas**: Crear, leer, actualizar y eliminar recetas
- **🎨 Interfaz Moderna**: Diseño responsive con Bootstrap 5
- **🔍 Búsqueda Avanzada**: Encuentra recetas rápidamente
- **📱 Responsive**: Funciona perfectamente en móviles y tablets
- **⚡ API REST**: Endpoint para integración con otras aplicaciones

## 🚀 Instalación y Uso

### Prerrequisitos

- Python 3.7 o superior
- pip (gestor de paquetes de Python)

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ExeDevCentral/Recetario.git
   cd Recetario
   ```

2. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Ejecuta la aplicación:**
   ```bash
   python app.py
   ```

4. **Abre tu navegador:**
   ```
   http://localhost:5000
   ```

## 📁 Estructura del Proyecto

```
Recetario/
├── app.py                 # Aplicación principal Flask
├── requirements.txt       # Dependencias de Python
├── README.md             # Este archivo
├── templates/            # Plantillas HTML
│   ├── base.html         # Plantilla base
│   ├── index.html        # Página principal
│   ├── categoria.html    # Vista de categoría
│   ├── receta.html       # Vista de receta
│   ├── crear_categoria.html
│   ├── crear_receta.html
│   └── editar_receta.html
└── static/               # Archivos estáticos
    ├── css/
    │   └── style.css     # Estilos personalizados
    └── js/
        └── main.js       # JavaScript personalizado
```

## 🎯 Funcionalidades

### Gestión de Categorías
- Crear nuevas categorías (ej: Desayunos, Postres, Bebidas)
- Ver todas las categorías con contador de recetas
- Eliminar categorías vacías

### Gestión de Recetas
- Crear recetas con ingredientes e instrucciones
- Editar recetas existentes
- Eliminar recetas
- Ver recetas organizadas por categoría

### Características Adicionales
- **Búsqueda**: Busca recetas por nombre o contenido
- **Responsive**: Adaptable a cualquier dispositivo
- **Notificaciones**: Mensajes de éxito y error
- **API REST**: Endpoint `/api/recetas` para obtener todas las recetas

## 🛠️ Tecnologías Utilizadas

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5
- **Iconos**: Font Awesome 6
- **Almacenamiento**: Sistema de archivos local

## 📱 Capturas de Pantalla

### Página Principal
- Vista de todas las categorías
- Contador de recetas totales
- Acciones rápidas

### Vista de Categoría
- Lista de recetas por categoría
- Acciones de edición y eliminación

### Vista de Receta
- Contenido completo de la receta
- Opciones de edición y eliminación

## 🔧 Configuración

### Variables de Entorno
La aplicación usa la siguiente configuración por defecto:
- **Puerto**: 5000
- **Host**: 0.0.0.0 (accesible desde cualquier IP)
- **Modo Debug**: Activado en desarrollo

### Almacenamiento de Datos
Las recetas se almacenan en archivos de texto en:
```
~/Recetas/
├── Categoria1/
│   ├── receta1.txt
│   └── receta2.txt
└── Categoria2/
    └── receta3.txt
```

## 🚀 Despliegue

### Desarrollo Local
```bash
python app.py
```

### Producción
Para desplegar en producción, considera:
1. Usar un servidor WSGI como Gunicorn
2. Configurar un servidor web como Nginx
3. Usar una base de datos en lugar de archivos
4. Configurar variables de entorno para producción

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**ExeDevCentral**
- GitHub: [@ExeDevCentral](https://github.com/ExeDevCentral)

## 🙏 Agradecimientos

- [Flask](https://flask.palletsprojects.com/) - Framework web
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [Font Awesome](https://fontawesome.com/) - Iconos
- [Python](https://www.python.org/) - Lenguaje de programación

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
