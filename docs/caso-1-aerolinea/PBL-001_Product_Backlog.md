---
id_unico: PBL-001
version: v1.0
estado_final: Aprobado
autor_revisor: Sebastián Villa Vargas
fecha_cierre: 2026-09-25
artefactos_relacionados: [PVB-001, US-001]
---

# Backlog Priorizado — Épicas, Historias de Usuario y Requisitos (AeroAlign)

**Proyecto:** AeroAlign (Empresa de Operaciones Aéreas)[cite: 9]  
**Autor:** Sebastián Villa Vargas[cite: 9]  

---

## 1. Épicas
Las 10 historias de usuario identificadas a partir del *Product Vision Board* se agrupan en las siguientes 4 épicas[cite: 9]:

| ID Épica | Nombre de la Épica                           | Descripción / Objetivo                                                                                                         | Historias Asociadas         |
| :------- | :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| **EP1**  | **Gestión de Datos Maestros**                | Mantener actualizada la información base del sistema: tripulantes, tripulaciones, vuelos y escenarios estándar[cite: 9].       | HU4, HU5, HU6, HU8[cite: 9] |
| **EP2**  | **Evaluación de Pilotos en Simulador**       | Registrar y consultar la capacidad de cada piloto frente a los distintos escenarios de simulación[cite: 9].                    | HU3, HU7[cite: 9]           |
| **EP3**  | **Asignación de Tripulaciones**              | Determinar el escenario más cercano a las condiciones de un vuelo y asignar la tripulación más apta según puntuación[cite: 9]. | HU9, HU10[cite: 9]          |
| **EP4**  | **Consulta de Información para Tripulantes** | Dar visibilidad a pilotos y copilotos sobre sus vuelos asignados y las características de cualquier vuelo[cite: 9].            | HU1, HU2[cite: 9]           |

---

## 2. Historias de Usuario por Épica

### 🔹 EP1 — Gestión de Datos Maestros[cite: 9]
* **HU4 (Must have):** Como personal administrativo, quiero registrar y actualizar los datos de los tripulantes (nombre, número de empleado, fecha de nacimiento), para mantener el personal actualizado[cite: 9].
* **HU5 (Must have):** Como personal administrativo, quiero registrar y actualizar los datos de las tripulaciones (vuelos efectuados, horas de vuelo, observaciones), para reflejar su experiencia acumulada[cite: 9].
* **HU6 (Must have):** Como personal administrativo, quiero registrar los datos de cada vuelo (fecha, origen, destino, condiciones meteorológicas y visibilidad previstas), para que estén disponibles para consulta y asignación[cite: 9].
* **HU8 (Must have):** Como personal administrativo, quiero definir los escenarios estándar (combinaciones de parámetros de visibilidad, meteorología y relieve), para que coincidan con los del simulador[cite: 9].

### 🔹 EP2 — Evaluación de Pilotos en Simulador[cite: 9]
* **HU7 (Must have):** Como personal administrativo, quiero registrar el resultado de la simulación de un piloto en un escenario (valor y fecha), reemplazando el resultado anterior en ese escenario, para mantener una única evaluación vigente[cite: 9].
* **HU3 (Should have):** Como piloto, quiero consultar los escenarios estándar y mi evaluación en cada uno, para conocer mi desempeño y cumplir la exigencia anual[cite: 9].

### 🔹 EP3 — Asignación de Tripulaciones[cite: 9]
* **HU9 (Must have):** Como operador de vuelo, quiero comparar las características de un vuelo con los escenarios definidos, para elegir el que más se aproxime a las condiciones previstas[cite: 9].
* **HU10 (Must have):** Como operador de vuelo, quiero asignar una tripulación a un vuelo seleccionando al piloto con mayor puntuación en el escenario elegido, para garantizar la tripulación más adecuada[cite: 9].

### 🔹 EP4 — Consulta de Información para Tripulantes[cite: 9]
* **HU1 (Should have):** Como piloto/copiloto, quiero consultar los vuelos que tengo asignados, para prepararme adecuadamente[cite: 9].
* **HU2 (Should have):** Como piloto/copiloto, quiero consultar las características de cualquier vuelo (fecha, origen, destino, meteorología, visibilidad), para tener información aunque no esté asignado a él[cite: 9].

---

## 3. Requisitos Funcionales (RF)

| ID       | Requisito Funcional                                                                                                                            | Historia Relacionada |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| **RF1**  | El sistema debe mostrar al piloto/copiloto los vuelos que tiene asignados[cite: 9].                                                            | HU1[cite: 9]         |
| **RF2**  | El sistema debe permitir consultar las características de cualquier vuelo[cite: 9].                                                            | HU2[cite: 9]         |
| **RF3**  | El sistema debe mostrar los escenarios estándar y la evaluación del piloto en cada uno[cite: 9].                                               | HU3[cite: 9]         |
| **RF4**  | El sistema debe permitir registrar y editar datos de tripulantes[cite: 9].                                                                     | HU4[cite: 9]         |
| **RF5**  | El sistema debe permitir registrar y editar datos de tripulaciones[cite: 9].                                                                   | HU5[cite: 9]         |
| **RF6**  | El sistema debe permitir registrar y editar datos de vuelos[cite: 9].                                                                          | HU6[cite: 9]         |
| **RF7**  | El sistema debe permitir registrar el resultado de simulación de un piloto en un escenario, sustituyendo el valor anterior si existe[cite: 9]. | HU7[cite: 9]         |
| **RF8**  | El sistema debe permitir definir escenarios como combinación de parámetros con valor y peso[cite: 9].                                          | HU8[cite: 9]         |
| **RF9**  | El sistema debe permitir comparar un vuelo con los escenarios disponibles[cite: 9].                                                            | HU9[cite: 9]         |
| **RF10** | El sistema debe permitir asignar una tripulación a un vuelo según puntuación del piloto en el escenario elegido[cite: 9].                      | HU10[cite: 9]        |

---

## 4. Requisitos No Funcionales (RNF)

| ID       | Categoría               | Requisito No Funcional                                                                                                     |
| :------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **RNF1** | **Seguridad**           | Solo el personal administrativo puede crear/editar tripulantes, tripulaciones, vuelos y resultados de simulación[cite: 9]. |
| **RNF2** | **Seguridad**           | Solo los operadores de vuelo pueden asignar tripulaciones a los vuelos[cite: 9].                                           |
| **RNF3** | **Integridad de Datos** | El sistema no debe permitir más de un resultado de simulación vigente por piloto y escenario[cite: 9].                     |
| **RNF4** | **Usabilidad**          | Las consultas de vuelos y escenarios deben ser accesibles y comprensibles para pilotos sin formación técnica[cite: 9].     |
| **RNF5** | **Disponibilidad**      | La información debe estar disponible para consulta en todo momento por los tripulantes[cite: 9].                           |
| **RNF6** | **Trazabilidad**        | Todo cambio en datos críticos (asignaciones, resultados de simulación) debe quedar registrado con fecha[cite: 9].          |

---

## 5. Priorización MoSCoW

* **Must have (HU4, HU5, HU6, HU7, HU8, HU9, HU10):** Datos base y flujo de comparación/asignación; sin ellos el sistema no cumple su propósito central[cite: 9].
* **Should have (HU1, HU2, HU3):** Aportan valor y transparencia a los tripulantes, pero el sistema podría operar de forma limitada sin ellas en una primera versión[cite: 9].
* **Could have (KPIs e Indicadores):** Indicadores y reportes de asignaciones; mencionado como valor de negocio, no indispensable para el funcionamiento básico[cite: 9].
* **Won't have (por ahora):** Notificaciones automáticas, app móvil e integración directa con el simulador (fuera del alcance del caso)[cite: 9].