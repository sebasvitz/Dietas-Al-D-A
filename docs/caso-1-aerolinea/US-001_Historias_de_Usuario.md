---
id_unico: US-001
version: v1.0
estado_final: Aprobado
autor_revisor: Sebastián Villa Vargas
fecha_cierre: 2026-09-25
artefactos_relacionados: [PVB-001, PBL-001]
---

# Historias de Usuario e Ingeniería de Requisitos — AeroAlign (Caso 1)

**Proyecto:** AeroAlign (Empresa de Operaciones Aéreas)[cite: 7] 
**Autor:** Sebastián Villa Vargas[cite: 7] 

---

## 📌 Historias de Usuario y Tareas de Ingeniería

### 🔹 HU1: Consultar mis vuelos asignados
* **Usuario:** Piloto / Copiloto[cite: 7]
* **Prioridad:** Media (Should have)[cite: 7]
* **Épica relacionada:** EP4[cite: 7]
* **Fechas:** 25/08/2026 – 28/08/2026[cite: 7]
* **Descripción:** Como piloto/copiloto, quiero consultar los vuelos que tengo asignados, para prepararme adecuadamente[cite: 7].
* **Criterios de Aceptación:**
  * Dado un piloto/copiloto autenticado, cuando consulta sus vuelos, entonces el sistema muestra solo los vuelos donde está asignado[cite: 7].
  * Dado que no tiene vuelos asignados, entonces el sistema muestra un mensaje indicándolo[cite: 7].
* **Tarea de Ingeniería (T1):** Implementar consulta de vuelos asignados al piloto/copiloto (`Desarrollo` | `2 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU2: Consultar características de cualquier vuelo
* **Usuario:** Piloto / Copiloto[cite: 7]
* **Prioridad:** Media (Should be)[cite: 7]
* **Épica relacionada:** EP4[cite: 7]
* **Fechas:** 17/07/2026 – 28/07/2026[cite: 7]
* **Descripción:** Como piloto/copiloto, quiero consultar las características de cualquier vuelo (fecha, origen, destino, meteorología, visibilidad), para tener información aunque no esté asignado a él[cite: 7].
* **Criterios de Aceptación:**
  * Dado cualquier tripulante autenticado, cuando busca un vuelo (asignado o no), entonces el sistema muestra fecha, origen, destino, condiciones meteorológicas y visibilidad previstas[cite: 7].
* **Tarea de Ingeniería (T2):** Implementar consulta de características de cualquier vuelo (`Desarrollo` | `2 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU3: Consultar escenarios y mi evaluación
* **Usuario:** Piloto[cite: 7]
* **Prioridad:** Media (Should have)[cite: 7]
* **Épica relacionada:** EP2[cite: 7]
* **Fechas:** 17/07/2026 – 28/07/2026[cite: 7]
* **Descripción:** Como piloto, quiero consultar los escenarios estándar y mi evaluación en cada uno, para conocer mi desempeño y cumplir la exigencia anual[cite: 7].
* **Criterios de Aceptación:**
  * Dado un piloto autenticado, cuando consulta los escenarios estándar, entonces el sistema lista todos con sus parámetros[cite: 7].
  * Dado que el piloto tiene resultado registrado en un escenario, entonces el sistema muestra el valor y la fecha de su última evaluación en ese escenario[cite: 7].
* **Tarea de Ingeniería (T3):** Implementar consulta de escenarios estándar y evaluación del piloto (`Desarrollo` | `3 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU4: Registrar y actualizar tripulantes
* **Usuario:** Personal administrativo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP1[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como personal administrativo, quiero registrar y actualizar los datos de los tripulantes (nombre, número de empleado, fecha de nacimiento), para mantener el personal actualizado[cite: 7].
* **Criterios de Aceptación:**
  * Dado el personal administrativo, cuando registra un tripulante con nombre, número de empleado y fecha de nacimiento completos, entonces el sistema lo guarda[cite: 7].
  * Dado un número de empleado ya existente, cuando se intenta registrar de nuevo, entonces el sistema no permite duplicados[cite: 7].
* **Tarea de Ingeniería (T4):** Diseñar y desarrollar CRUD de tripulantes (`Desarrollo` | `3 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU5: Registrar y actualizar tripulaciones
* **Usuario:** Personal administrativo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP1[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como personal administrativo, quiero registrar y actualizar los datos de las tripulaciones (vuelos efectuados, horas de vuelo, observaciones), para reflejar su experiencia acumulada[cite: 7].
* **Criterios de Aceptación:**
  * Dado el personal administrativo, cuando registra una tripulación con piloto y copiloto asignados, entonces el sistema guarda vuelos efectuados, horas de vuelo y observaciones[cite: 7].
  * Dado que se actualizan las horas de vuelo, entonces el sistema refleja el nuevo valor sin perder el histórico de observaciones[cite: 7].
* **Tarea de Ingeniería (T5):** Diseñar y desarrollar CRUD de tripulaciones (`Desarrollo` | `3 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU6: Registrar vuelos
* **Usuario:** Personal administrativo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP1[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como personal administrativo, quiero registrar los datos de cada vuelo (fecha, origen, destino, condiciones meteorológicas y visibilidad previstas), para que estén disponibles para consulta y asignación[cite: 7].
* **Criterios de Aceptación:**
  * Dado que el administrativo ingresa un vuelo, cuando faltan datos obligatorios (fecha, origen, destino), entonces el sistema no permite guardar[cite: 7].
  * Dado un vuelo con datos completos, cuando se guarda, entonces queda disponible para consulta y asignación[cite: 7].
* **Tarea de Ingeniería (T6):** Diseñar y desarrollar CRUD de vuelos (`Desarrollo` | `3 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU7: Registrar resultado de simulación
* **Usuario:** Personal administrativo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP2[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como personal administrativo, quiero registrar el resultado de la simulación de un piloto en un escenario (valor y fecha), reemplazando el resultado anterior en ese escenario, para mantener una única evaluación vigente[cite: 7].
* **Criterios de Aceptación:**
  * Dado que un piloto ya tiene un resultado registrado en un escenario, cuando el administrativo registra un nuevo resultado para ese piloto y escenario, entonces el sistema reemplaza el valor y fecha anteriores[cite: 7].
  * Dado que se intenta guardar un resultado sin valor numérico o fecha, entonces el sistema no permite guardar y muestra un error[cite: 7].
* **Tarea de Ingeniería (T7):** Desarrollar registro de resultado de simulación con reemplazo del valor anterior (`Desarrollo` | `5 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU8: Definir escenarios estándar
* **Usuario:** Personal administrativo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP1[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como personal administrativo, quiero definir los escenarios estándar (combinaciones de parámetros de visibilidad, meteorología y relieve), para que coincidan con los del simulador[cite: 7].
* **Criterios de Aceptación:**
  * Dado el personal administrativo, cuando crea un escenario, entonces debe poder asociar parámetros de visibilidad, meteorología y relieve, cada uno con su valor de dificultad y peso[cite: 7].
  * Dado un escenario ya creado, entonces el sistema debe permitir que coincida en nombre con el definido en el simulador[cite: 7].
* **Tarea de Ingeniería (T8):** Diseñar y desarrollar gestión de escenarios y parámetros (`Desarrollo` | `3 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU9: Comparar vuelo con escenarios
* **Usuario:** Operador de vuelo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP3[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como operador de vuelo, quiero comparar las características de un vuelo con los escenarios definidos, para elegir el que más se aproxime a las condiciones previstas[cite: 7].
* **Criterios de Aceptación:**
  * Dado un vuelo con condiciones registradas, cuando el operador solicita comparar, entonces el sistema muestra los escenarios disponibles para que el operador elija el más aproximado[cite: 7].
* **Tarea de Ingeniería (T9):** Desarrollar comparación de vuelo contra escenarios disponibles (`Desarrollo` | `8 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

### 🔹 HU10: Asignar tripulación a un vuelo
* **Usuario:** Operador de vuelo[cite: 7]
* **Prioridad:** Alta (Must have)[cite: 7]
* **Épica relacionada:** EP3[cite: 7]
* **Fechas:** 03/07/2026 – 14/07/2026[cite: 7]
* **Descripción:** Como operador de vuelo, quiero asignar una tripulación a un vuelo seleccionando al piloto con mayor puntuación en el escenario elegido, para garantizar la tripulación más adecuada[cite: 7].
* **Criterios de Aceptación:**
  * Dado un escenario elegido para un vuelo, cuando el operador asigna tripulación, entonces el sistema permite seleccionar al piloto con mayor puntuación registrada en ese escenario[cite: 7].
  * Dado que un vuelo ya tiene tripulación asignada, cuando se reasigna, entonces el sistema reemplaza la asignación anterior[cite: 7].
* **Tarea de Ingeniería (T10):** Desarrollar asignación de tripulación con selección por mayor puntuación (`Desarrollo` | `8 Puntos` | Resp: Sebastián Villa)[cite: 7].

---

## 📊 Visual Story Mapping (Planificación de Releases)

| Release       |  HU1  |  HU2  |  HU3  |  HU4  |  HU5  |  HU6  |  HU7  |  HU8  |  HU9  | HU10  |    Total Puntos     |
| :------------ | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :-----------------: |
| **Release 1** |   -   |   -   |   -   | 3 pts | 3 pts | 3 pts | 5 pts | 3 pts | 8 pts | 8 pts | **33 pts**[cite: 7] |
| **Release 2** | 2 pts | 2 pts | 3 pts |   -   |   -   |   -   |   -   |   -   |   -   |   -   | **7 pts**[cite: 7]  |
| **Release 3** |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   | **0 pts**[cite: 7]  |
| **Release 4** |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   | **0 pts**[cite: 7]  |
| **Release 5** |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   |   -   | **0 pts**[cite: 7]  |