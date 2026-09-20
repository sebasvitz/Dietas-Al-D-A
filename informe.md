# Informe de prototipado · Dietas al Día · EPC 28

**Curso:** Ingeniería de Requisitos · **Prototipado:** Análisis de Caso
**Autor(es):** Sebastián Villa
**Prototipo desplegado:** 
https://dietas-al-dia-iota.vercel.app
**Objetivo del prototipo:** ver la sección «Objetivo del prototipo» del [README](README.md).

---

## 1. Viabilidad técnica del diseño

El prototipo es una aplicación web (React 19 + Vite + styled-components, con configuración PWA) desplegada en Vercel. Simula el cruce entre la historia clínica y el catálogo de dietas con datos ficticios en memoria, y es técnicamente viable porque el cruce no depende de texto libre:

- Cada **alimento** declara los alérgenos que contiene (etiquetas como `gluten`, `pescado`, `lacteos`) y cada **paciente** registra sus alergias e incompatibilidades con esas mismas etiquetas.
- Cada **dieta** referencia alimentos y enfermedades por identificador, de modo que las dietas asociadas a un diagnóstico salen de una relación real y no de coincidencias de nombre.
- El cruce y las reglas de confirmación son funciones puras (`web/src/utils/conflicts.js`) con 15 pruebas automáticas (`npm test`).

Para llevarlo a producción haría falta un servicio de datos y autenticación reales, un catálogo de alérgenos validado por nutricionistas y el tratamiento de datos de salud como datos sensibles (Ley 1581 de 2012 en Colombia). Nada de esto invalida el diseño: el modelo de datos y las reglas se trasladan tal cual.

## 2. Requisitos funcionales derivados de la EPC 28

**EPC 28 · Asignación tratamiento nutricional.** Como médico del Departamento de Nutrición quiero consultar las dietas compatibles con el diagnóstico de un paciente, señalando explícitamente si alguna dieta contiene alimentos incompatibles con sus alergias registradas, para elegir con seguridad un tratamiento sin cruzar manualmente la historia clínica con el catálogo de dietas.

| ID | Requisito | Prioridad | CA | Criterio verificable |
|---|---|---|---|---|
| RF-01 | Seleccionar un paciente y ver su resumen clínico | Alta | CA1, CA3 | **Dado** que existen pacientes registrados, **cuando** el médico selecciona uno, **entonces** se muestra un banner con nombre, edad, sexo, peso, talla, IMC, alergias, incompatibilidades y diagnóstico, que permanece visible mientras se desplaza la pantalla. |
| RF-02 | Elegir el diagnóstico entre las enfermedades registradas del paciente | Alta | CA1 | **Dado** un paciente con varias enfermedades, **cuando** lo selecciona, **entonces** se preselecciona la primera y el médico puede alternar de diagnóstico sin recargar. |
| RF-03 | Listar las dietas asociadas al diagnóstico en un único paso | Alta | CA1 | **Dado** un paciente con una enfermedad registrada, **cuando** lo selecciona, **entonces** el sistema muestra en la misma pantalla, sin acciones adicionales, las dietas asociadas con su objetivo, aporte calórico y duración. |
| RF-04 | Cruzar los alimentos de cada dieta con las alergias e incompatibilidades del paciente | Alta | CA2 | **Dado** que los alimentos de una dieta tienen etiquetas de alérgeno, **cuando** se lista para un paciente, **entonces** cada dieta queda clasificada como *segura*, *incompatibilidad* o *alergia* (la alergia prevalece). |
| RF-05 | Señalar cada conflicto de forma inequívoca | Alta | CA2 | **Dado** una dieta con conflicto, **cuando** aparece en el listado, la ficha o el panel de confirmación, **entonces** se muestra con icono, color y texto que nombran el alimento, la restricción y su tipo (alergia o incompatibilidad). |
| RF-06 | Exigir una acción explícita antes de asignar una dieta con alerta | Alta | CA2, CA4 | **Dado** una dieta con *alergia*, **entonces** no se puede confirmar. **Dado** una dieta con *incompatibilidad*, **entonces** solo se confirma tras marcar que se revisó la alerta y escribir una justificación de al menos 10 caracteres. **Dado** un paciente con alergias no registradas, **entonces** se exige confirmar que se verificaron con el paciente. |
| RF-07 | Consultar la ficha técnica completa de cualquier dieta sin perder el contexto del paciente | Alta | CA3 | **Dado** cualquier dieta del listado (con o sin alerta), **cuando** el médico abre su ficha, **entonces** ve todos los campos (objetivos, definición técnica, aporte calórico, componentes, ingesta, vía de administración, duración, dosificación, pauta y suplementos) y el banner del paciente sigue visible. |
| RF-08 | Confirmar y registrar la asignación de la dieta | Alta | Épica | **Dado** una dieta seleccionada que cumple las condiciones de RF-06, **cuando** el médico confirma, **entonces** se registra la asignación, se muestra un mensaje de éxito y se conservan el paciente y el diagnóstico en pantalla. |
| RF-09 | Ordenar las dietas con las seguras primero y filtrar solo las seguras | Media | CA4 | **Dado** un listado con dietas de distinto estado, **entonces** aparecen primero las seguras y el filtro «Mostrar solo seguras» oculta las demás. |
| RF-10 | Manejar estados vacíos y datos faltantes | Media | CA1, CA2 | **Dado** un diagnóstico sin dietas, o un paciente sin enfermedades o con alergias no registradas, **entonces** el sistema lo informa con un mensaje claro y **no** muestra dietas no asociadas. |
| RF-11 | Registrar la asignación para auditoría | Baja | CA2 | **Dado** una asignación confirmada, **entonces** queda en el historial de la sesión con fecha y hora, paciente, diagnóstico, dieta, alertas mostradas, si fueron reconocidas y la justificación. |

Cada RF de prioridad Alta cubre al menos un CA, y cada CA queda cubierto por al menos un RF Alto: **CA1** → RF-01, 02, 03; **CA2** → RF-04, 05, 06; **CA3** → RF-01, 07; **CA4** → RF-06, 09 (con el flujo de RF-01 a RF-08).

## 3. Lista de verificación IEEE

Se aplicó a los RF de prioridad Alta (RF-01 a RF-08), con los atributos de calidad de un requisito de IEEE 830 / ISO-IEEE 29148.

| Criterio | Pregunta de verificación | Resultado | Observación |
|---|---|---|---|
| Correcto | ¿Responde a una necesidad real del médico descrita en la EPC 28? | Cumple | Cada RF se deriva de la historia épica y de sus CA. |
| No ambiguo | ¿Admite una sola interpretación? | Cumple con ajustes | La EPC original tenía términos ambiguos («único paso», «inequívoca», «sin perder el contexto», «segura»). Se definieron en los RF (ver tabla de la sección 5). |
| Completo | ¿Incluye entradas, comportamiento y casos límite? | Cumple con ajustes | La EPC no cubría diagnóstico sin dietas, alergias no registradas ni paciente con varias enfermedades. Se agregaron RF-02 y RF-10. |
| Consistente | ¿Se contradicen entre sí? | Cumple | Bloqueo por alergia y confirmación condicionada por incompatibilidad se distinguen de forma explícita en RF-06. |
| Priorizado | ¿Tiene prioridad asignada? | Cumple | Alta, Media o Baja en la tabla de la sección 2. |
| Verificable | ¿Se puede comprobar con una prueba objetiva? | Cumple | Cada RF tiene un criterio Dado/Cuando/Entonces con resultado observable (sección 4). |
| Modificable | ¿Cada requisito está en un solo lugar y sin duplicación? | Cumple | Un requisito por identificador; los RF referencian a los CA en lugar de repetirlos. |
| Trazable | ¿Se puede seguir hasta su origen y hasta el prototipo? | Cumple | La columna CA da el origen; los elementos de la interfaz llevan el atributo `data-rf` con el ID del RF. |

## 4. Validación en el prototipo

**Método.** Se ejecutó cada caso sobre los datos demo del [README](README.md) y se comparó con el resultado esperado. La lógica de cruce y las reglas de confirmación cuentan además con 15 pruebas automáticas (`cd web && npm test`), todas superadas. `npm run lint` y `npm run build` también pasan sin errores.

| Caso | Datos y acción | Resultado esperado | RF / CA | Resultado |
|---|---|---|---|---|
| C1 | Seleccionar a Ana García (Obesidad grado I) | Aparecen 3 dietas en la misma pantalla, ordenadas: segura, incompatibilidad, alergia | RF-03, RF-09 / CA1 | Cumple |
| C2 | Abrir «Dieta para obesidad con pescado» | Alerta de alergia (Salmón, pescado) e incompatibilidad (Avena, gluten); el botón de confirmar queda deshabilitado | RF-04, 05, 06 / CA2 | Cumple |
| C3 | Abrir «Dieta mediterránea baja en calorías» | Alerta de incompatibilidad (Pan integral de trigo, gluten); solo se confirma tras marcar la casilla y escribir una justificación de 10 o más caracteres | RF-06 / CA2, CA4 | Cumple |
| C4 | Abrir y confirmar «Dieta hipocalórica para obesidad» | Sin alertas; se confirma directo, aparece el mensaje de éxito y el banner de Ana sigue visible | RF-08 / CA1 | Cumple |
| C5 | Abrir la ficha de una dieta con alerta | Se ve la ficha completa con todos los campos y el banner del paciente | RF-07 / CA3 | Cumple |
| C6 | Cambiar el diagnóstico de Ana a Hipertensión arterial | Mensaje «No hay dietas asociadas a este diagnóstico»; no se muestran otras dietas | RF-02, RF-10 / CA1 | Cumple |
| C7 | Carlos Ruiz (frutos secos) | «Dieta diabética con frutos secos» con alergia; «Dieta de control glucémico» segura | RF-04 / CA2 | Cumple |
| C8 | Marta Londoño (lácteos) | «Dieta rica en hierro con lácteos» con incompatibilidad; la versión sin lácteos, segura | RF-04 / CA2 | Cumple |
| C9 | Luis Pérez (alergias no registradas) | Aviso visible; la confirmación exige verificar las alergias con el paciente | RF-06, RF-10 / CA2 | Cumple |
| C10 | Activar «Mostrar solo seguras» con Ana | Solo queda la dieta hipocalórica | RF-09 / CA4 | Cumple |
| C11 | Confirmar una dieta y revisar el historial | Aparece la asignación con fecha, paciente, dieta, alertas y justificación | RF-11 / CA2 | Cumple |


## 4. Conclusión: ¿queda validado o se reformula?

**La EPC 28 queda validada con ajustes de redacción en sus criterios de aceptación.**

- **CA1, CA2 y CA3** se cumplen en el prototipo (casos C1 a C11).
- **CA4** se puede probar con el prototipo; su cumplimiento depende de los resultados de la tabla de la sección 4.
- El requisito no se descarta, pero la EPC original tenía ambigüedades y casos sin cubrir. Se resolvieron así:

| Ambigüedad o vacío | Ajuste |
|---|---|
| «Único paso» (CA1) | Las dietas aparecen en la misma pantalla al seleccionar el paciente, sin acciones adicionales. |
| «De forma inequívoca» (CA2) | Icono + color + texto con el alimento, la restricción y el tipo; sin depender solo del color. |
| Alergia vs. incompatibilidad (CA2) | La alergia bloquea la asignación; la incompatibilidad exige reconocimiento y justificación. |
| «Sin perder el contexto» (CA3) | Banner del paciente fijo en pantalla mientras se consulta la ficha. |
| «Segura» y «sin pasar por alto ninguna alerta» (CA4) | Segura = sin conflictos con alergias ni incompatibilidades; ninguna dieta con alerta se confirma sin la acción de RF-06. |
| Paciente con alergias no registradas | Se advierte y se exige verificación (RF-06, RF-10). |
| Paciente con varias enfermedades, diagnóstico sin dietas | Se agregan RF-02 y RF-10. |

**Criterios de aceptación reformulados**

- **CA1.** Dado un paciente con al menos una enfermedad registrada, cuando el médico lo selecciona, el sistema muestra en la misma pantalla, sin acciones adicionales, las dietas asociadas al diagnóstico.
- **CA2.** Si una dieta incluye un alimento al que el paciente es alérgico o incompatible, el sistema lo señala con icono, color y texto (alimento, restricción y tipo) en el listado, la ficha y la confirmación; una alergia bloquea la asignación y una incompatibilidad exige reconocimiento y justificación.
- **CA3.** El médico abre la ficha técnica completa de cualquier dieta, con o sin alerta, mientras el resumen del paciente permanece visible.
- **CA4.** Un usuario que no ha usado el sistema, sin ayuda, elige y confirma una dieta segura en menos de 90 segundos, y ninguna dieta con alerta se confirma sin la acción explícita requerida.

**Limitaciones.** Los datos son ficticios y viven en memoria; el acceso es simulado; el catálogo cubre pocos pacientes y dietas; los resultados de CA4 dependen de una muestra pequeña de usuarios.
