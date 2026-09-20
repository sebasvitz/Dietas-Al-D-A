// Datos ficticios para el prototipo. Ningún dato corresponde a personas reales.

export const allergenTags = [
  { value: 'pescado', label: 'Pescado' },
  { value: 'mariscos', label: 'Mariscos' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'lacteos', label: 'Lácteos' },
  { value: 'frutos_secos', label: 'Frutos secos' },
  { value: 'huevo', label: 'Huevo' },
  { value: 'soya', label: 'Soya' },
]

export const initialData = {
  foods: [
    { id: 'food-salmon', nombre: 'Salmón', definicion: 'Pescado azul de alto valor biológico.', origen: 'Marino', funcionalidad: 'Aporte de omega-3.', alergenos: ['pescado'] },
    { id: 'food-atun', nombre: 'Atún', definicion: 'Pescado azul rico en proteína magra.', origen: 'Marino', funcionalidad: 'Aporte de proteína y omega-3.', alergenos: ['pescado'] },
    { id: 'food-camaron', nombre: 'Camarón', definicion: 'Crustáceo de bajo aporte calórico.', origen: 'Marino', funcionalidad: 'Aporte de proteína.', alergenos: ['mariscos'] },
    { id: 'food-pollo', nombre: 'Pollo', definicion: 'Carne blanca magra.', origen: 'Animal', funcionalidad: 'Aporte de proteína.', alergenos: [] },
    { id: 'food-verduras', nombre: 'Verduras mixtas', definicion: 'Conjunto de hortalizas de temporada.', origen: 'Vegetal', funcionalidad: 'Aporte de fibra, vitaminas y minerales.', alergenos: [] },
    { id: 'food-arroz-integral', nombre: 'Arroz integral', definicion: 'Cereal integral sin gluten.', origen: 'Vegetal', funcionalidad: 'Carbohidrato complejo y fibra.', alergenos: [] },
    { id: 'food-aceite-oliva', nombre: 'Aceite de oliva', definicion: 'Grasa vegetal monoinsaturada.', origen: 'Vegetal', funcionalidad: 'Aporte de grasas saludables.', alergenos: [] },
    { id: 'food-avena', nombre: 'Avena', definicion: 'Cereal con posible contenido de gluten por contaminación cruzada.', origen: 'Vegetal', funcionalidad: 'Fibra soluble y energía sostenida.', alergenos: ['gluten'] },
    { id: 'food-pan-trigo', nombre: 'Pan integral de trigo', definicion: 'Pan elaborado con harina integral de trigo.', origen: 'Vegetal', funcionalidad: 'Carbohidrato complejo y fibra.', alergenos: ['gluten'] },
    { id: 'food-quinua', nombre: 'Quinua', definicion: 'Pseudocereal sin gluten.', origen: 'Vegetal', funcionalidad: 'Proteína vegetal completa.', alergenos: [] },
    { id: 'food-lentejas', nombre: 'Lentejas', definicion: 'Legumbre rica en hierro y fibra.', origen: 'Vegetal', funcionalidad: 'Aporte de hierro y proteína vegetal.', alergenos: [] },
    { id: 'food-espinaca', nombre: 'Espinaca', definicion: 'Hortaliza de hoja verde.', origen: 'Vegetal', funcionalidad: 'Aporte de hierro y folato.', alergenos: [] },
    { id: 'food-higado', nombre: 'Hígado de res', definicion: 'Víscera rica en hierro hemo y vitamina A.', origen: 'Animal', funcionalidad: 'Aporte de hierro y vitamina B12.', alergenos: [] },
    { id: 'food-nueces', nombre: 'Nueces', definicion: 'Fruto seco rico en grasas insaturadas.', origen: 'Vegetal', funcionalidad: 'Aporte de omega-3 vegetal.', alergenos: ['frutos_secos'] },
    { id: 'food-almendras', nombre: 'Almendras', definicion: 'Fruto seco rico en vitamina E.', origen: 'Vegetal', funcionalidad: 'Aporte de grasas saludables y antioxidantes.', alergenos: ['frutos_secos'] },
    { id: 'food-yogur', nombre: 'Yogur natural', definicion: 'Lácteo fermentado sin azúcar añadida.', origen: 'Animal', funcionalidad: 'Aporte de calcio y probióticos.', alergenos: ['lacteos'] },
    { id: 'food-leche', nombre: 'Leche entera', definicion: 'Lácteo con grasa completa.', origen: 'Animal', funcionalidad: 'Aporte de energía, calcio y proteína.', alergenos: ['lacteos'] },
    { id: 'food-huevo', nombre: 'Huevo', definicion: 'Alimento de alto valor biológico.', origen: 'Animal', funcionalidad: 'Aporte de proteína completa.', alergenos: ['huevo'] },
  ],
  nutrients: [],
  vitamins: [],
  conditions: [
    { id: 'cond-obesidad-1', nombre: 'Obesidad grado I', causas: 'Balance energético positivo sostenido.', diagnosis: 'IMC entre 30 y 34.9.', diferenciales: 'Hipotiroidismo, síndrome metabólico.', tratamiento: 'Educación alimentaria + actividad física.', objetivo: 'Reducir 5%-10% del peso corporal.' },
    { id: 'cond-hipertension', nombre: 'Hipertensión arterial', causas: 'Factores genéticos, exceso de sodio y sedentarismo.', diagnosis: 'Presión arterial sostenida ≥ 140/90 mmHg.', diferenciales: 'Hipertensión secundaria, efecto de bata blanca.', tratamiento: 'Control de sodio, actividad física y seguimiento médico.', objetivo: 'Mantener la presión arterial por debajo de 130/80 mmHg.' },
    { id: 'cond-diabetes-2', nombre: 'Diabetes tipo 2', causas: 'Resistencia a la insulina y exceso de peso.', diagnosis: 'Glucemia en ayunas ≥ 126 mg/dL o HbA1c ≥ 6.5%.', diferenciales: 'Diabetes tipo 1, LADA, diabetes secundaria.', tratamiento: 'Plan de alimentación con control de carbohidratos y actividad física.', objetivo: 'Mantener HbA1c por debajo de 7%.' },
    { id: 'cond-anemia', nombre: 'Anemia ferropénica', causas: 'Ingesta insuficiente de hierro o pérdidas crónicas.', diagnosis: 'Hemoglobina baja con ferritina disminuida.', diferenciales: 'Talasemia, anemia de enfermedad crónica.', tratamiento: 'Dieta rica en hierro y suplementación.', objetivo: 'Normalizar hemoglobina y reponer reservas de hierro.' },
    { id: 'cond-desnutricion', nombre: 'Desnutrición proteico-calórica', causas: 'Ingesta inadecuada de energía y proteínas.', diagnosis: 'IMC < 18.5 y pérdida de peso no intencional.', diferenciales: 'Malabsorción, hipertiroidismo, cáncer.', tratamiento: 'Dieta hipercalórica e hiperproteica con seguimiento.', objetivo: 'Recuperar peso y masa muscular de forma progresiva.' },
  ],
  diets: [
    {
      id: 'diet-hipocalorica', nombre: 'Dieta hipocalórica para obesidad',
      objetivos: 'Disminución progresiva de peso.', definicion: 'Restricción energética moderada con control de macros.', calorias: '1500 kcal/día',
      alimentosIds: ['food-verduras', 'food-pollo', 'food-arroz-integral', 'food-aceite-oliva'], enfermedadesIds: ['cond-obesidad-1'],
      ingesta: '5 tomas diarias', via: 'Oral', duracion: '12 semanas', dosificacion: 'Porciones controladas', pauta: 'Plan semanal', suplementos: 'Vitamina D',
    },
    {
      id: 'diet-obesidad-pescado', nombre: 'Dieta para obesidad con pescado',
      objetivos: 'Pérdida de peso con aporte de omega-3.', definicion: 'Plan hipocalórico que incorpora pescado azul.', calorias: '1600 kcal/día',
      alimentosIds: ['food-verduras', 'food-salmon', 'food-avena', 'food-aceite-oliva'], enfermedadesIds: ['cond-obesidad-1'],
      ingesta: '5 tomas diarias', via: 'Oral', duracion: '12 semanas', dosificacion: 'Porciones controladas', pauta: 'Plan semanal', suplementos: 'Vitamina D',
    },
    {
      id: 'diet-mediterranea', nombre: 'Dieta mediterránea baja en calorías',
      objetivos: 'Pérdida de peso con patrón cardioprotector.', definicion: 'Patrón mediterráneo con restricción calórica moderada.', calorias: '1550 kcal/día',
      alimentosIds: ['food-verduras', 'food-lentejas', 'food-pan-trigo', 'food-pollo', 'food-aceite-oliva'], enfermedadesIds: ['cond-obesidad-1'],
      ingesta: '4 tomas diarias', via: 'Oral', duracion: '16 semanas', dosificacion: 'Porciones medidas por plato', pauta: 'Plan semanal con menú rotativo', suplementos: 'Ninguno',
    },
    {
      id: 'diet-control-glucemico', nombre: 'Dieta de control glucémico',
      objetivos: 'Mantener glucemia estable y reducir picos posprandiales.', definicion: 'Carbohidratos de bajo índice glucémico distribuidos en el día.', calorias: '1800 kcal/día',
      alimentosIds: ['food-lentejas', 'food-verduras', 'food-pollo', 'food-quinua'], enfermedadesIds: ['cond-diabetes-2'],
      ingesta: '6 tomas diarias', via: 'Oral', duracion: '24 semanas', dosificacion: 'Carbohidratos por porción medida', pauta: 'Horarios fijos de comida', suplementos: 'Ninguno',
    },
    {
      id: 'diet-diabetica-frutos-secos', nombre: 'Dieta diabética con frutos secos',
      objetivos: 'Control glucémico con grasas insaturadas.', definicion: 'Plan de bajo índice glucémico con frutos secos como snack.', calorias: '1900 kcal/día',
      alimentosIds: ['food-verduras', 'food-pollo', 'food-nueces', 'food-almendras'], enfermedadesIds: ['cond-diabetes-2'],
      ingesta: '5 tomas diarias', via: 'Oral', duracion: '24 semanas', dosificacion: 'Porción de 30 g de frutos secos al día', pauta: 'Plan semanal', suplementos: 'Omega-3',
    },
    {
      id: 'diet-rica-hierro', nombre: 'Dieta rica en hierro con lácteos',
      objetivos: 'Reponer reservas de hierro.', definicion: 'Alimentos ricos en hierro hemo y no hemo combinados con yogur.', calorias: '2000 kcal/día',
      alimentosIds: ['food-lentejas', 'food-espinaca', 'food-higado', 'food-yogur'], enfermedadesIds: ['cond-anemia'],
      ingesta: '5 tomas diarias', via: 'Oral', duracion: '12 semanas', dosificacion: 'Hígado 1 vez por semana', pauta: 'Plan semanal', suplementos: 'Hierro elemental y vitamina C',
    },
    {
      id: 'diet-hierro-sin-lacteos', nombre: 'Dieta rica en hierro sin lácteos',
      objetivos: 'Reponer reservas de hierro sin lácteos.', definicion: 'Alimentos ricos en hierro combinados con cereal integral sin gluten.', calorias: '2000 kcal/día',
      alimentosIds: ['food-lentejas', 'food-espinaca', 'food-higado', 'food-arroz-integral'], enfermedadesIds: ['cond-anemia'],
      ingesta: '5 tomas diarias', via: 'Oral', duracion: '12 semanas', dosificacion: 'Hígado 1 vez por semana', pauta: 'Plan semanal', suplementos: 'Hierro elemental y vitamina C',
    },
    {
      id: 'diet-hipercalorica', nombre: 'Dieta hipercalórica e hiperproteica',
      objetivos: 'Recuperación de peso y masa muscular.', definicion: 'Aumento progresivo de energía y proteínas.', calorias: '2600 kcal/día',
      alimentosIds: ['food-huevo', 'food-leche', 'food-pollo', 'food-arroz-integral', 'food-aceite-oliva'], enfermedadesIds: ['cond-desnutricion'],
      ingesta: '6 tomas diarias', via: 'Oral', duracion: '8 semanas', dosificacion: 'Porciones ampliadas con suplemento entre comidas', pauta: 'Plan semanal con seguimiento de peso', suplementos: 'Suplemento oral hipercalórico',
    },
  ],
  records: [
    { id: 'pac-ana', nombre: 'Ana García', edad: 39, sexo: 'Femenino', pesoKg: 92, tallaM: 1.64, datos: 'Tel. 300 000 0001', alergias: ['pescado'], incompatibilidades: ['gluten'], alergiasRegistradas: true, antecedentes: 'Diabetes tipo 2 materna', enfermedadesIds: ['cond-obesidad-1', 'cond-hipertension'] },
    { id: 'pac-carlos', nombre: 'Carlos Ruiz', edad: 55, sexo: 'Masculino', pesoKg: 84, tallaM: 1.7, datos: 'Tel. 300 000 0002', alergias: ['frutos_secos'], incompatibilidades: [], alergiasRegistradas: true, antecedentes: 'Hipertensión paterna', enfermedadesIds: ['cond-diabetes-2'] },
    { id: 'pac-marta', nombre: 'Marta Londoño', edad: 28, sexo: 'Femenino', pesoKg: 58, tallaM: 1.62, datos: 'Tel. 300 000 0003', alergias: [], incompatibilidades: ['lacteos'], alergiasRegistradas: true, antecedentes: 'Sin antecedentes relevantes', enfermedadesIds: ['cond-anemia'] },
    { id: 'pac-luis', nombre: 'Luis Pérez', edad: 71, sexo: 'Masculino', pesoKg: 49, tallaM: 1.68, datos: 'Tel. 300 000 0004', alergias: [], incompatibilidades: [], alergiasRegistradas: false, antecedentes: 'Cardiopatía familiar', enfermedadesIds: ['cond-desnutricion'] },
  ],
}
