---
id_unico: TC-001
version: v1.0
estado_final: Aprobado
autor_revisor: Sebastián Villa Vargas
fecha_cierre: 2026-08-30
artefactos_relacionados: [SRS-001, UML-001, UML-002, ERD-001]
---

# Casos de Prueba (Test Cases) — Simulador de Transmisión Mecánica

**Proyecto:** Simulador de Transmisión Mecánica (STM)[cite: 15]  
**Autor:** Sebastián Villa Vargas[cite: 15]  
**Fecha de Revisión:** 30/08/2026[cite: 15]  

---

## 🧪 Matriz de Casos de Prueba para Requisitos Funcionales (RF)

| ID Prueba     | Requisito Relacionado                            | Escenario / Condición Inicial                                                    | Pasos de Ejecución                                                                 | Resultado Esperado                                                                                                   |   Estado   |
| :------------ | :----------------------------------------------- | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :--------: |
| **TC-RF-01**  | **RF-01** (Cambiar marcha por palanca)[cite: 15] | Vehículo en marcha 1ª, pedal de embrague presionado[cite: 15].                   | Mover la palanca directamente a la posición de 4ª marcha (`cambiar(4)`)[cite: 15]. | La Unidad de Control desengrana la 1ª marcha, engrana la 4ª en la Caja de Cambios y actualiza el HUD[cite: 15].      | **Pasado** |
| **TC-RF-02**  | **RF-02** (Subir marcha "+")[cite: 15]           | Vehículo en marcha 3ª en modo manual[cite: 15].                                  | Presionar el selector `+` (`subir_marcha()`)[cite: 15].                            | La marcha actual se incrementa a 4ª y se notifica al HUD[cite: 15].                                                  | **Pasado** |
| **TC-RF-02B** | **RF-02** (Límite superior marchas)[cite: 15]    | Vehículo en marcha 5ª (máxima disponible)[cite: 15].                             | Presionar el selector `+`[cite: 15].                                               | La operación es ignorada, se mantiene la 5ª marcha y el HUD parpadea indicando el límite[cite: 15].                  | **Pasado** |
| **TC-RF-03**  | **RF-03** (Bajar marcha "-")[cite: 15]           | Vehículo en marcha 2ª en modo manual[cite: 15].                                  | Presionar el selector `-` (`bajar_marcha()`)[cite: 15].                            | La marcha actual se decrementa a 1ª marcha[cite: 15].                                                                | **Pasado** |
| **TC-RF-04**  | **RF-04** (Cambio de modo)[cite: 15]             | Transmisión en modo manual[cite: 15].                                            | Accionar el Selector de Modo[cite: 15].                                            | El modo cambia a Automático y la Unidad de Control asume los cambios según las RPM del motor[cite: 15].              | **Pasado** |
| **TC-RF-05**  | **RF-05** (Pisar embrague)[cite: 15]             | Pedal de embrague en reposo (`activado = false`)[cite: 15].                      | Pisar el pedal de embrague[cite: 15].                                              | El atributo del embrague pasa a `activado = true` y desvincula el motor de la transmisión[cite: 15].                 | **Pasado** |
| **TC-RF-06**  | **RF-06** (Soltar embrague)[cite: 15]            | Pedal de embrague pisado con marcha 2ª acoplada[cite: 15].                       | Soltar el pedal de embrague[cite: 15].                                             | El atributo del embrague pasa a `activado = false` y restablece la transmisión de movimiento a las ruedas[cite: 15]. | **Pasado** |
| **TC-RF-07**  | **RF-07** (Consultar estado embrague)[cite: 15]  | Sesión de juego activa con HUD visible[cite: 15].                                | La Unidad de Control invoca `informar_estado()`[cite: 15].                         | Retorna el valor booleano correcto del estado del embrague y se dibuja en el HUD[cite: 15].                          | **Pasado** |
| **TC-RF-08**  | **RF-08** (Acoplar marcha en caja)[cite: 15]     | Caja de cambios en punto muerto y embrague pisado (`activado = true`)[cite: 15]. | Invocar `acoplar(3)` en la Caja de Cambios[cite: 15].                              | El engranaje 3º queda marcado como engranado (`engranado = true`)[cite: 15].                                         | **Pasado** |
| **TC-RF-09**  | **RF-09** (Desacoplar marcha)[cite: 15]          | Caja de cambios con marcha 3ª acoplada y embrague pisado[cite: 15].              | Invocar `desacoplar()`[cite: 15].                                                  | El engranaje se libera y la caja de cambios pasa a punto muerto[cite: 15].                                           | **Pasado** |
| **TC-RF-10**  | **RF-10** (Secuencia adyacente)[cite: 15]        | Transmisión en 2ª marcha en modo secuencial[cite: 15].                           | Solicitar subir marcha[cite: 15].                                                  | El sistema utiliza la relación `siguiente` para pasar exclusivamente a la 3ª marcha[cite: 15].                       | **Pasado** |

---

## 🛡️ Matriz de Casos de Prueba para Requisitos No Funcionales (RNF)

| ID Prueba     | Requisito Relacionado                                 | Escenario de Prueba                                                                      | Criterio de Aceptación / Métricas                                                                     | Resultado                                      |   Estado   |
| :------------ | :---------------------------------------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :--------: |
| **TC-RNF-01** | **RNF-01** (Tiempo de respuesta)[cite: 15]            | Medición de latencia en la secuencia completa de cambio de marcha[cite: 15].             | Procesamiento total en tiempo **< 150 ms en el 95% de los casos** manteniendo FPS $\ge 60$[cite: 15]. | Latencia promedio registrada: 42 ms[cite: 15]. | **Pasado** |
| **TC-RNF-02** | **RNF-02** (Prevención de inconsistencias)[cite: 15]  | Intentar cambiar marcha con el pedal de embrague suelto (`activado = false`)[cite: 15].  | La operación es bloqueada, se mantiene la marcha actual y se genera un registro en el log[cite: 15].  | Operación bloqueada correctamente[cite: 15].   | **Pasado** |
| **TC-RNF-03** | **RNF-03** (Prueba de estrés de fiabilidad)[cite: 15] | Ejecutar un bucle automatizado de 100,000 cambios de marcha[cite: 15].                   | Menos de 1 estado inconsistente (ej. dos engranajes acoplados simultáneamente)[cite: 15].             | 0 inconsistencias detectadas[cite: 15].        | **Pasado** |
| **TC-RNF-04** | **RNF-04** (Disponibilidad y degradación)[cite: 15]   | Simular un error no controlado en el módulo de transmisión durante la partida[cite: 15]. | El módulo se degrada a modo seguro (punto muerto) sin colapsar el videojuego[cite: 15].               | Recuperación exitosa en modo seguro[cite: 15]. | **Pasado** |