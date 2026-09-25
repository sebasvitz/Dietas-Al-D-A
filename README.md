---
id_unico: PORTFOLIO-001
version: v1.0
estado_final: Aprobado
autor_revisor: Sebastián Villa Vargas
fecha_cierre: 2026-09-25
artefactos_relacionados: [PVB-001, PBL-001, US-001, SRS-001, UML-001, ERD-001, UML-002, TC-001, PROTO-001, TRACE-001]
---

# Portafolio de Ingeniería de Requisitos — Portafolio Final del Curso

**Autor:** Sebastián Villa Vargas  
**Asignatura:** Ingeniería de Requisitos · UPB  
**Repositorio GitHub:** https://github.com/sebasvitz/Dietas-Al-D-A.git  
**Prototipo Desplegado (Caso 3):** https://dietas-al-dia-iota.vercel.app

---

## 📚 Estructura e Inventario del Repositorio

El repositorio está organizado en tres grandes casos de estudio y el código fuente ejecutable, diseñado para ser navegable de forma autónoma:

```text
Dietas-Al-D-A/
├── README.md                   <-- Presentación global, lecciones aprendidas y guía de ejecución
├── docs/
│   ├── caso-1-aerolinea/       <-- Caso 1: Empresa de Operaciones Aéreas (AeroAlign)
│   │   ├── PVB-001_Product_Vision_Board.md
│   │   ├── PBL-001_Product_Backlog.md
│   │   └── US-001_Historias_de_Usuario.md
│   │
│   ├── caso-2-simulador/       <-- Caso 2: Portal de Mudanzas / Simulador de Conducción
│   │   ├── SRS-001_Software_Requirements_Specification.md
│   │   ├── UML-001_Diagrama_de_Clases.md
│   │   ├── ERD-001_Modelo_Entidad_Relacion.md
│   │   ├── UML-002_Casos_de_Uso.md
│   │   ├── TC-001_Test_Cases.md
│   │   └── assets/             <-- Diagramas e imágenes y archivo de Enterprise Architect (.qea)
│   │
│   └── caso-3-dietas/          <-- Caso 3: Aplicación Dietas Al Día (EPC 28)
│       ├── PROTO-001_Informe_Prototipado_EPC28.md
│       └── TRACE-001_Matriz_Trazabilidad_EPC28.xlsx
│
└── web/                        <-- Código fuente React 19 + Vite de Dietas Al Día
# Dietas al Día

Prototipo de alta fidelidad para médicos nutricionistas.

## Requisitos para ejecutar en local

- Node.js 20+ (recomendado)
- npm 10+

## Ejecutar en local

```bash
cd web
npm install
npm run dev
```

Luego abre en el navegador la URL que muestra Vite (normalmente `http://localhost:5173`).

## Objetivo del prototipo

Validar que un médico de Nutrición puede consultar las dietas compatibles con el diagnóstico de un paciente, identificar sin ambigüedad las que contienen alimentos que chocan con sus alergias o incompatibilidades y confirmar solo las opciones seguras o debidamente revisadas.

## Datos demo para probar el flujo

Todos los datos son **ficticios**. El acceso es simulado (no se conecta con Google): usa el botón **Entrar con datos demo** o escribe `Dr. Demo` / `demo@gmail.com`.

| Paciente              | Enfermedades                            | Alergias       | Incompatibilidades | Qué permite probar                                                                                 |
| --------------------- | --------------------------------------- | -------------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| Ana García (39, F)    | Obesidad grado I, Hipertensión arterial | Pescado        | Gluten             | Varios diagnósticos; dieta segura, con incompatibilidad y con alergia; estado vacío (Hipertensión) |
| Carlos Ruiz (55, M)   | Diabetes tipo 2                         | Frutos secos   | —                  | Dieta segura vs. dieta con alergia                                                                |
| Marta Londoño (28, F) | Anemia ferropénica                      | —              | Lácteos            | Solo incompatibilidad                                                                            |
| Luis Pérez (71, M)    | Desnutrición proteico-calórica          | No registradas | —                  | Aviso de alergias sin verificar                                                                    |

### Recorrido recomendado

1. Entra con **Entrar con datos demo**. La app abre en **Asignar tratamiento**.
2. Selecciona a **Ana García**: aparecen sus dietas para Obesidad grado I, con las seguras primero y las alertas visibles en cada tarjeta.
3. Abre **Dieta para obesidad con pescado**: se ven la ficha técnica completa y la alerta de alergia; la asignación queda bloqueada.
4. Abre **Dieta mediterránea baja en calorías**: solo se puede confirmar tras reconocer la incompatibilidad y escribir una justificación.
5. Abre **Dieta hipocalórica para obesidad** (segura) y pulsa **Confirmar asignación de dieta**.
6. Cambia el diagnóstico a **Hipertensión arterial** para ver el estado vacío.

### Reglas de confirmación

| Estado de la dieta                   | Comportamiento                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| Segura                               | Se puede confirmar directamente                                                 |
| Incompatibilidad                     | Exige marcar «He revisado la alerta» y una justificación (mínimo 10 caracteres) |
| Alergia                              | Bloqueada: no se puede confirmar                                                |
| Paciente con alergias no registradas | Exige marcar «Verifiqué las alergias con el paciente»                           |

### Modo evaluación (pruebas con usuarios)

Abre la app con `?eval=1` en la URL (por ejemplo `http://localhost:5173/?eval=1`). Aparece un panel con la tarea de la prueba, un cronómetro que se detiene al confirmar una asignación y un botón para iniciar la tarea.

### Requisitos funcionales en la interfaz

Los elementos de la vista de asignación llevan el atributo `data-rf` con el ID del requisito (RF-01 a RF-11).

### Limitaciones

- Datos ficticios; el acceso es simulado.
- Pacientes, dietas y asignaciones añadidos durante la sesión se guardan solo en memoria: al recargar vuelven los datos demo.

## Build local de producción

```bash
cd web
npm run build
npm run preview
```

## Scripts útiles

```bash
npm run dev      # entorno local
npm run build    # build de producción
npm run preview  # previsualizar build
npm run lint     # validación de lint
npm run test     # pruebas de la lógica de conflictos (Node, sin dependencias)
```

## Evaluación y pruebas

El prototipo se puede evaluar de cuatro formas. Los resultados y el análisis están en [PROTO-001_Informe_Prototipado_EPC28.md](docs/caso-3-dietas/PROTO-001_Informe_Prototipado_EPC28.md).

### 1. Modo evaluación (pruebas con usuarios · CA4)

Abre la app con `?eval=1` al final de la URL:

- Despliegue: https://dietas-al-dia-iota.vercel.app/?eval=1
- Local: http://localhost:5173/?eval=1

Aparece un panel oscuro con la tarea *«Asignar una dieta segura a Ana García para su obesidad»*. El usuario pulsa **Iniciar tarea** y el cronómetro se detiene al confirmar una asignación. El panel ayuda a medir tiempos y errores.

### 2. Pruebas automáticas

```bash
cd web
npm test
```

Ejecuta 15 pruebas (Node, sin dependencias adicionales) de la lógica de cruce de alergias, el orden de las dietas, las reglas de confirmación, el cálculo del IMC y la consistencia de los datos demo.

### 3. Lint y compilación

```bash
npm run lint
npm run build
```

### 4. Casos de prueba manuales

Los casos C1 a C11, con datos, resultado esperado y resultado obtenido, están en la sección 4 de [PROTO-001_Informe_Prototipado_EPC28.md](docs/caso-3-dietas/PROTO-001_Informe_Prototipado_EPC28.md). Se ejecutan sobre los datos demo y comparan el comportamiento con la lógica de negocio.

### 5. Lecciones aprendidas

# 1. ¿Qué práctica de ingeniería de requisitos funciona y por qué debería usarse?

## Respuesta

La práctica fundamental que mejor funciona en el desarrollo de un proyecto es la **combinación del Product Vision Board con la definición y desglose en Épicas e Historias de Usuario**:

- **Descomposición Modular del Alcance:** Aporta un gran valor al tomar un sistema grande, pesado y complejo, y dividirlo en pedazos cortos y ligeros (*incrementos*). Esto permite al equipo entender mejor el problema y priorizar entregas.
- **Validación Mediante Prototipado Claro:** Tener historias de usuario bien acotadas y priorizadas facilita el paso hacia la creación de un prototipo que permite ver la funcionalidad de las cosas de forma tangible.

# 2. ¿Qué técnica de gestión de requisitos tomó/falló y cómo se podría detectar?

## Respuesta

Falló el uso de **software de modelado pesado e inflexible** junto con la **burocracia documental tradicional de las Solicitudes de Cambio (RFC)**:

- **Fricción en el Modelado:** El uso de herramientas de modelado rígidas o pesadas resulta enredado y poco ágil. Aunque el diseño de diagramas es una técnica muy útil, existen opciones modernas y más prácticas.
- **Sobrecarga por Solicitudes de Cambio (RFC):** El documento de solicitud de cambios es importante para la trazabilidad, pero gestionarlo en formatos tradicionales se convierte en una carga temporal y de coordinación.
- **Cómo se detectó:** Se identificó por el retraso en el ritmo de iteración y la fricción del equipo ante la documentación. Se puede optimizar implementando un flujo más ágil.

# 3. ¿Qué haríamos diferente en el proceso de gestión de requisitos desde el inicio?

## Respuesta

Desde el inicio del proyecto, implementaría una **formulación temprana de la visión y del alcance de la documentación**, respaldada por **herramientas de modelado ágiles y prototipado exploratorio**:

- **Claridad Temprana del Alcance:** Utilizaría el **Product Vision Board** desde la fase inicial. Resulta una herramienta maravillosa para poner un punto de partida claro en cualquier proyecto.
- **Herramientas de Diagramación más Prácticas:** Para proyectos con arquitecturas complejas, optaría por motores de diagramación más prácticos, visuales y fáciles de mantener.
- **Prototipos Funcionales Tempranos:** Incorporaría prototipos ya funcionales desde las primeras etapas. Tener un vistazo a futuro de cómo pueden ser las soluciones que el proyecto necesitará permite reducir ambigüedad y acelerar la validación.
