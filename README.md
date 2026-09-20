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

Validar que un médico de Nutrición puede consultar las dietas compatibles con el diagnóstico de un paciente, identificar sin ambigüedad las que contienen alimentos que chocan con sus alergias o incompatibilidades, y asignar una dieta segura sin cruzar manualmente la historia clínica con el catálogo.

## Datos demo para probar el flujo

Todos los datos son **ficticios**. El acceso es simulado (no se conecta con Google): usa el botón **Entrar con datos demo** o escribe `Dr. Demo` / `demo@gmail.com`.

| Paciente              | Enfermedades                            | Alergias       | Incompatibilidades | Qué permite probar                                                                                                 |
| --------------------- | --------------------------------------- | -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Ana García (39, F)    | Obesidad grado I, Hipertensión arterial | Pescado        | Gluten             | Varios diagnósticos; dieta segura, con incompatibilidad y con alergia; estado vacío (Hipertensión no tiene dietas) |
| Carlos Ruiz (55, M)   | Diabetes tipo 2                         | Frutos secos   | —                  | Dieta segura vs. dieta con alergia                                                                                 |
| Marta Londoño (28, F) | Anemia ferropénica                      | —              | Lácteos            | Solo incompatibilidad                                                                                              |
| Luis Pérez (71, M)    | Desnutrición proteico-calórica          | No registradas | —                  | Aviso de alergias sin verificar                                                                                    |

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

Abre la app con `?eval=1` en la URL (por ejemplo `http://localhost:5173/?eval=1`). Aparece un panel con la tarea de la prueba, un cronómetro que se detiene al confirmar una asignación y un botón para copiar el resultado en JSON.

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

El prototipo se puede evaluar de cuatro formas. Los resultados y el análisis están en [INFORME.md](INFORME.md).

### 1. Modo evaluación (pruebas con usuarios · CA4)

Abre la app con `?eval=1` al final de la URL:

- Despliegue: https://dietas-al-dia-iota.vercel.app/?eval=1
- Local: http://localhost:5173/?eval=1

Aparece un panel oscuro con la tarea *«Asignar una dieta segura a Ana García para su obesidad»*. El usuario pulsa **Iniciar tarea** y el cronómetro se detiene al confirmar una asignación. El panel muestra el tiempo, si quedó dentro de 90 s, el estado de la dieta elegida y las alertas mostradas y reconocidas, y permite copiar el resultado en JSON. No guarda nada: al recargar se reinicia, y sin `?eval=1` el panel no aparece.

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

Los casos C1 a C11, con datos, resultado esperado y resultado obtenido, están en la sección 4 de [INFORME.md](INFORME.md). Se ejecutan sobre los pacientes de la tabla de datos demo.
