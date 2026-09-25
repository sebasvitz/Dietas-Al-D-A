---
id_unico: SRS-001
version: v1.0
estado_final: Aprobado
autor_revisor: Sebastián Villa Vargas
fecha_cierre: 2026-08-30
artefactos_relacionados: [UML-001, ERD-001, UML-002, TC-001]
---

# Especificación de Requisitos de Software (SRS) — Simulador de Transmisión Mecánica

**Proyecto:** Simulador de Transmisión Mecánica de un Vehículo de Competición (STM)  
**Estándar:** IEEE Std 830-1998[cite: 15]  
**Autor:** Sebastián Villa Vargas[cite: 15]  
**Fecha de Revisión:** 30/08/2026[cite: 15]  

---

## 1. Introducción

### 1.1 Propósito
Especificar de manera completa, no ambigua y verificable los requisitos de software del módulo de transmisión mecánica del simulador de conducción desarrollado por la empresa de videojuegos, sirviendo de base para diseño, implementación y pruebas[cite: 15].

### 1.2 Alcance
El producto **Simulador de Transmisión Mecánica (STM)** reproduce el comportamiento realista de la transmisión de un vehículo de competición: selección y cambio de marchas, embrague, caja de cambios y engranajes[cite: 15]. Permite transmitir el movimiento generado por el motor a las ruedas según la marcha seleccionada (manual/automático)[cite: 15]. Quedan fuera del alcance los subsistemas de motor, físicas de neumáticos, sonido, gráficos e IA[cite: 15].

### 1.3 Personal Involucrado
* **Autor / Analista:** Sebastián Villa Vargas (Ingeniería de software)[cite: 15].
* **Rol:** Elicitar, especificar, validar y mantener trazabilidad de los requisitos del STM[cite: 15].

### 1.4 Definiciones y Acrónimos
* **SRS:** Software Requirements Specification (IEEE 830-1998)[cite: 15].
* **STM:** Simulador de Transmisión Mecánica[cite: 15].
* **RPM:** Revoluciones por minuto del motor simulado[cite: 15].
* **Embrague:** Componente que conecta/desconecta el motor de la caja de cambios[cite: 15].

---

## 2. Descripción General

### 2.1 Perspectiva del Producto
El STM es un subsistema integrado dentro del motor de un videojuego[cite: 15]. Internamente, se compone de las clases: `Palanca`, `Selector de marcha`, `Selector de modo`, `Unidad de control`, `Embrague`, `Pedal`, `Caja de cambios` y `Engranaje`[cite: 15].

### 2.2 Requisitos Funcionales Principales (RF)
* **RF-01:** Cambiar de marcha mediante la palanca directamente (validando marchas del 0 al 5)[cite: 15].
* **RF-02:** Subir marcha de forma secuencial con el selector `+`[cite: 15].
* **RF-03:** Bajar marcha de forma secuencial con el selector `-`[cite: 15].
* **RF-04:** Cambiar modo de funcionamiento (Manual / Automático)[cite: 15].
* **RF-05:** Activar el embrague al pisar el pedal[cite: 15].
* **RF-06:** Desactivar el embrague al soltar el pedal[cite: 15].
* **RF-07:** Informar del estado del embrague en tiempo real[cite: 15].
* **RF-08:** Acoplar una marcha en la caja de cambios (exige embrague activado)[cite: 15].
* **RF-09:** Desacoplar la marcha actual (exige embrague activado)[cite: 15].
* **RF-10:** Validar la secuencia de engranajes adyacentes mediante relación anterior/siguiente[cite: 15].

---

## 3. Requisitos No Funcionales (RNF)

* **RNF-01 (Rendimiento):** Tiempo de respuesta del cambio de marcha inferior a **150 ms en el 95% de los casos**, manteniendo tasa de refresco $\ge 60$ FPS[cite: 15].
* **RNF-02 (Seguridad):** Prevención de estados inconsistentes; impide acoplar/desacoplar si el embrague no está activado[cite: 15].
* **RNF-03 (Fiabilidad):** Máximo 1 incidencia de estado inconsistente por cada 100,000 cambios de marcha simulados[cite: 15].
* **RNF-04 (Disponibilidad):** Operatividad del 100% durante la partida sin bloqueos del juego[cite: 15].
* **RNF-05 (Mantenibilidad):** Arquitectura orientada a objetos extensible para cajas secuenciales o DCT sin modificar la Unidad de Control[cite: 15].
* **RNF-06 (Portabilidad):** Código implementado exclusivamente con APIs multiplataforma (menos del 5% de código dependiente de SO)[cite: 15].