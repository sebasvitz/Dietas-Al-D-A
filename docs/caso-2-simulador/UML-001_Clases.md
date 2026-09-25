---
id_unico: UML-001
version: v1.0
estado_final: Aprobado
autor_revisor: Sebastián Villa Vargas
fecha_cierre: 2026-09-25
artefactos_relacionados: [SRS-001, ERD-001, UML-002]
---

# Modelo Estructural — Diagrama de Clases UML

**Proyecto:** Portal de Mudanzas (Sistema de Gestión y Cotización)  
**Autor:** Sebastián Villa Vargas  

---

## 📐 Diagrama de Clases UML del Dominio

A continuación se presenta el modelo conceptual de clases del dominio, representando las entidades principales (*Cliente*, *Solicitud*, *DetalleSolicitud*, *EmpresaMudanza*, *Empleado*, *OfertaServicio*, *Poblacion*, *Vehiculo*, *PlusPeso*, *TipoTransporte*) y sus relaciones con multiplicidad[cite: 11]:

![Diagrama de Clases - Portal de Mudanzas](./diagrama_clases.png)

### Entidades y Atributos Clave
* **`Cliente`:** `cc`, `codigo`, `direccion`, `nombreCompleto`, `telefono`[cite: 11].
* **`Solicitud`:** `codigo`, `estado`, `fechaResolucion`, `fechaSolicitud`, `precioTotal`[cite: 11].
* **`DetalleSolicitud`:** `direccionDestino`, `direccionInicio`, `fechaRealEjecucion`, `precioServicio`, `tiempoTardado`[cite: 11].
* **`EmpresaMudanza`:** `direccion`, `nombre`, `telefono`[cite: 11].
* **`OfertaServicio`:** `precioHora`[cite: 11].
* **`PlusPeso`:** `pesoUmbral`, `porcentajeAumento`[cite: 11].