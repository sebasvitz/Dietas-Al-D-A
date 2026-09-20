# Dietas al Día

Prototipo de alta fidelidad para médicos nutricionistas.

## Requisitos para ejecutar en local

- Node.js 20+ (recomendado)
- npm 10+

## Ejecutar en local

```bash
cd /home/runner/work/Dietas-Al-D-A/Dietas-Al-D-A/web
npm install
npm run dev
```

Luego abre en el navegador la URL que muestra Vite (normalmente `http://localhost:5173`).

## Datos demo para probar el flujo

El registro es simulado. Usa estos datos para entrar:

- **Nombre:** `Dr. Demo`
- **Correo Google:** `demo@gmail.com`

La aplicación incluye estos datos dummy precargados:

- **Paciente:** Ana García
- **Datos:** 39 años · Femenino
- **Peso y talla:** 92 kg · 1.64 m
- **Alergia:** Pescado
- **Incompatibilidad:** Gluten
- **Enfermedad asociada:** Obesidad grado I
- **Dieta segura:** Dieta hipocalórica para obesidad
- **Dieta incompatible para probar la alerta:** Dieta para obesidad con pescado

### Recorrido recomendado

1. Regístrate con los datos demo.
2. Abre **Diagnóstico y Asignación**.
3. Selecciona a **Ana García**. El diagnóstico se completa automáticamente.
4. Selecciona **Dieta para obesidad con pescado** para ver la alerta y comprobar que no se puede confirmar.
5. Selecciona **Dieta hipocalórica para obesidad** para consultar la ficha técnica y registrarla.

Los pacientes, dietas y diagnósticos añadidos durante la sesión se guardan únicamente en memoria. Al recargar o cerrar la aplicación se eliminan y vuelven a aparecer los datos demo iniciales.

## Build local de producción

```bash
cd /home/runner/work/Dietas-Al-D-A/Dietas-Al-D-A/web
npm run build
npm run preview
```

## Scripts útiles

```bash
npm run dev      # entorno local
npm run build    # build de producción
npm run preview  # previsualizar build
npm run lint     # validación de lint
```

> Más adelante se puede desplegar en Vercel sin cambiar esta guía local.
