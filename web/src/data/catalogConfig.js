// Configuración de campos de los catálogos. Los campos `multiselect` toman sus
// opciones de otro catálogo (ver `optionsByField` en App.jsx).

export const catalogTabs = [
  { id: 'foods', label: 'Alimentos' },
  { id: 'nutrients', label: 'Nutrientes' },
  { id: 'vitamins', label: 'Vitaminas y minerales' },
  { id: 'diets', label: 'Dietas' },
  { id: 'conditions', label: 'Enfermedades' },
  { id: 'records', label: 'Historia clínica' },
]

export const catalogConfig = {
  foods: {
    title: 'Catálogo · Alimentos',
    fields: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'definicion', label: 'Definición' },
      { name: 'origen', label: 'Origen' },
      { name: 'funcionalidad', label: 'Funcionalidad principal' },
      { name: 'alergenos', label: 'Alérgenos que contiene', type: 'multiselect', required: false },
    ],
  },
  nutrients: {
    title: 'Catálogo · Nutrientes',
    fields: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'definicion', label: 'Definición' },
      { name: 'funcionalidad', label: 'Funcionalidad' },
      { name: 'tipo', label: 'Tipo/Subtipo' },
      { name: 'deficit', label: 'Enfermedades por déficit' },
      { name: 'fuentes', label: 'Fuentes alimentarias' },
    ],
  },
  vitamins: {
    title: 'Catálogo · Vitaminas y minerales',
    fields: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'funciones', label: 'Funciones asociadas' },
      { name: 'racion', label: 'Ración dietética recomendada' },
    ],
  },
  diets: {
    title: 'Catálogo · Dietas prediseñadas',
    fields: [
      { name: 'nombre', label: 'Nombre de la dieta' },
      { name: 'objetivos', label: 'Objetivos' },
      { name: 'definicion', label: 'Definición técnica' },
      { name: 'calorias', label: 'Aporte calórico' },
      { name: 'alimentosIds', label: 'Componentes (alimentos)', type: 'multiselect' },
      { name: 'enfermedadesIds', label: 'Enfermedades asociadas', type: 'multiselect' },
      { name: 'ingesta', label: 'Ingesta necesaria' },
      { name: 'via', label: 'Vía de administración' },
      { name: 'duracion', label: 'Duración' },
      { name: 'dosificacion', label: 'Dosificación' },
      { name: 'pauta', label: 'Pauta' },
      { name: 'suplementos', label: 'Suplementos' },
    ],
  },
  conditions: {
    title: 'Catálogo · Enfermedades nutricionales',
    fields: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'causas', label: 'Causas' },
      { name: 'diagnosis', label: 'Diagnosis' },
      { name: 'diferenciales', label: 'Diagnósticos diferenciales' },
      { name: 'tratamiento', label: 'Tratamiento' },
      { name: 'objetivo', label: 'Objetivo del tratamiento' },
    ],
  },
  records: {
    title: 'Historia clínica',
    fields: [
      { name: 'nombre', label: 'Nombre del paciente' },
      { name: 'edad', label: 'Edad', type: 'number', unit: 'años' },
      { name: 'sexo', label: 'Sexo', type: 'select', options: [{ value: 'Femenino', label: 'Femenino' }, { value: 'Masculino', label: 'Masculino' }] },
      { name: 'pesoKg', label: 'Peso', type: 'number', unit: 'kg' },
      { name: 'tallaM', label: 'Talla', type: 'number', unit: 'm' },
      { name: 'datos', label: 'Otros datos personales', required: false },
      { name: 'alergias', label: 'Alergias', type: 'multiselect', required: false },
      { name: 'incompatibilidades', label: 'Incompatibilidades', type: 'multiselect', required: false },
      { name: 'alergiasRegistradas', label: 'Alergias verificadas con el paciente', type: 'boolean' },
      { name: 'antecedentes', label: 'Antecedentes familiares', required: false },
      { name: 'enfermedadesIds', label: 'Enfermedades asociadas', type: 'multiselect', required: false },
    ],
  },
}

// Campos de la ficha técnica de una dieta (los que no son relaciones).
export const dietSheetFields = catalogConfig.diets.fields.filter(
  (field) => !['nombre', 'alimentosIds', 'enfermedadesIds'].includes(field.name),
)
