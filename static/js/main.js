// JavaScript para Mi Recetario

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers de Bootstrap
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Auto-hide alerts después de 5 segundos
    setTimeout(function() {
        var alerts = document.querySelectorAll('.alert');
        alerts.forEach(function(alert) {
            var bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        });
    }, 5000);

    // Confirmación para eliminar elementos
    var deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            var message = this.getAttribute('data-confirm');
            if (!confirm(message)) {
                e.preventDefault();
            }
        });
    });

    // Validación de formularios
    var forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Animación de entrada para cards
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function() {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Efecto de hover para botones
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Función para mostrar el modal de búsqueda
function mostrarBusqueda() {
    var searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    searchModal.show();
    
    // Focus en el input de búsqueda
    setTimeout(function() {
        document.getElementById('searchInput').focus();
    }, 500);
}

// Función para buscar recetas
function buscarRecetas() {
    var searchTerm = document.getElementById('searchInput').value.trim();
    var resultsContainer = document.getElementById('searchResults');
    
    if (searchTerm.length < 2) {
        resultsContainer.innerHTML = '<div class="text-muted text-center p-3">Escribe al menos 2 caracteres para buscar</div>';
        return;
    }
    
    // Mostrar loading
    resultsContainer.innerHTML = '<div class="text-center p-3"><i class="fas fa-spinner fa-spin"></i> Buscando...</div>';
    
    // Hacer petición a la API
    fetch('/api/recetas')
        .then(response => response.json())
        .then(data => {
            var filteredRecetas = data.filter(receta => 
                receta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                receta.contenido.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            mostrarResultadosBusqueda(filteredRecetas, resultsContainer);
        })
        .catch(error => {
            console.error('Error:', error);
            resultsContainer.innerHTML = '<div class="text-danger text-center p-3">Error al buscar recetas</div>';
        });
}

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(recetas, container) {
    if (recetas.length === 0) {
        container.innerHTML = '<div class="text-muted text-center p-3">No se encontraron recetas</div>';
        return;
    }
    
    var html = '';
    recetas.forEach(function(receta) {
        var contenidoPreview = receta.contenido.substring(0, 100);
        if (receta.contenido.length > 100) {
            contenidoPreview += '...';
        }
        
        html += `
            <div class="search-result-item">
                <h6 class="mb-2">
                    <i class="fas fa-book text-success me-2"></i>
                    <a href="/receta/${receta.categoria}/${receta.nombre}" class="text-decoration-none">
                        ${receta.nombre}
                    </a>
                </h6>
                <p class="text-muted mb-1">
                    <i class="fas fa-folder me-1"></i>${receta.categoria}
                </p>
                <p class="text-muted small">${contenidoPreview}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para confirmar eliminación
function confirmarEliminacion(mensaje) {
    return confirm(mensaje || '¿Estás seguro de que quieres eliminar este elemento?');
}

// Función para copiar texto al portapapeles
function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        // Mostrar notificación de éxito
        var toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = '<i class="fas fa-check me-2"></i>Texto copiado al portapapeles';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    });
}

// Función para imprimir receta
function imprimirReceta() {
    window.print();
}

// Función para compartir receta
function compartirReceta() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        });
    } else {
        // Fallback: copiar URL al portapapeles
        copiarTexto(window.location.href);
    }
}

// Función para expandir/contraer contenido largo
function toggleContenido(elementoId) {
    var elemento = document.getElementById(elementoId);
    var boton = document.querySelector(`[onclick="toggleContenido('${elementoId}')"]`);
    
    if (elemento.style.maxHeight) {
        elemento.style.maxHeight = null;
        boton.innerHTML = '<i class="fas fa-chevron-down me-1"></i>Ver más';
    } else {
        elemento.style.maxHeight = elemento.scrollHeight + 'px';
        boton.innerHTML = '<i class="fas fa-chevron-up me-1"></i>Ver menos';
    }
}

// Función para auto-resize textarea
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Event listeners adicionales
document.addEventListener('keydown', function(e) {
    // Ctrl+K para abrir búsqueda
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        mostrarBusqueda();
    }
    
    // Escape para cerrar modales
    if (e.key === 'Escape') {
        var modals = document.querySelectorAll('.modal.show');
        modals.forEach(function(modal) {
            var bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }
});

// CSS para animaciones
var style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);
