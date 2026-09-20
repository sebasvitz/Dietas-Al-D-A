import { useMemo, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1f2937;
    background: #f4f8fb;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(180deg, #f4f8fb 0%, #edf6f3 100%);
  }
`

const appTabs = [
  { id: 'foods', label: 'Alimentos' },
  { id: 'nutrients', label: 'Nutrientes' },
  { id: 'vitamins', label: 'Vitaminas y Minerales' },
  { id: 'diets', label: 'Dietas' },
  { id: 'conditions', label: 'Enfermedades' },
  { id: 'records', label: 'Historia Clínica' },
  { id: 'diagnosis', label: 'Diagnóstico y Asignación' },
]

const configuration = {
  foods: {
    title: 'RF1 · Catálogo de alimentos',
    fields: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'definicion', label: 'Definición' },
      { name: 'origen', label: 'Origen' },
      { name: 'funcionalidad', label: 'Funcionalidad principal' },
    ],
  },
  nutrients: {
    title: 'RF2 · Nutrientes',
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
    title: 'RF3 · Vitaminas y minerales',
    fields: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'funciones', label: 'Funciones asociadas' },
      { name: 'racion', label: 'Ración dietética recomendada' },
    ],
  },
  diets: {
    title: 'RF4 · Dietas prediseñadas',
    fields: [
      { name: 'nombre', label: 'Nombre de la dieta' },
      { name: 'objetivos', label: 'Objetivos' },
      { name: 'definicion', label: 'Definición técnica' },
      { name: 'calorias', label: 'Aporte calórico' },
      { name: 'componentes', label: 'Componentes (alimentos)' },
      { name: 'ingesta', label: 'Ingesta necesaria' },
      { name: 'via', label: 'Vía de administración' },
      { name: 'duracion', label: 'Duración' },
      { name: 'dosificacion', label: 'Dosificación' },
      { name: 'pauta', label: 'Pauta' },
      { name: 'suplementos', label: 'Suplementos' },
    ],
  },
  conditions: {
    title: 'RF5 · Enfermedades nutricionales',
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
    title: 'RF6 · Historia clínica',
    fields: [
      { name: 'nombre', label: 'Nombre del paciente' },
      { name: 'datos', label: 'Datos personales' },
      { name: 'peso', label: 'Peso' },
      { name: 'talla', label: 'Talla' },
      { name: 'incompatibilidades', label: 'Incompatibilidades' },
      { name: 'alergias', label: 'Alergias' },
      { name: 'antecedentes', label: 'Antecedentes familiares' },
      { name: 'asociadas', label: 'Enfermedades asociadas' },
    ],
  },
}

const initialData = {
  foods: [
    {
      id: crypto.randomUUID(),
      nombre: 'Salmón',
      definicion: 'Pescado azul de alto valor biológico.',
      origen: 'Marino',
      funcionalidad: 'Aporte de omega-3.',
    },
  ],
  nutrients: [],
  vitamins: [],
  diets: [
    {
      id: crypto.randomUUID(),
      nombre: 'Dieta hipocalórica para obesidad',
      objetivos: 'Disminución progresiva de peso.',
      definicion: 'Restricción energética moderada con control de macros.',
      calorias: '1500 kcal/día',
      componentes: 'Verduras, pollo, arroz integral y aceite de oliva.',
      ingesta: '5 tomas diarias',
      via: 'Oral',
      duracion: '12 semanas',
      dosificacion: 'Porciones controladas',
      pauta: 'Plan semanal',
      suplementos: 'Vitamina D',
    },
    {
      id: crypto.randomUUID(),
      nombre: 'Dieta para obesidad con pescado',
      objetivos: 'Pérdida de peso con aporte de omega-3.',
      definicion: 'Plan hipocalórico que incorpora pescado azul.',
      calorias: '1600 kcal/día',
      componentes: 'Verduras, pescado, avena y aceite de oliva.',
      ingesta: '5 tomas diarias',
      via: 'Oral',
      duracion: '12 semanas',
      dosificacion: 'Porciones controladas',
      pauta: 'Plan semanal',
      suplementos: 'Vitamina D',
    },
  ],
  conditions: [
    {
      id: crypto.randomUUID(),
      nombre: 'Obesidad grado I',
      causas: 'Balance energético positivo sostenido.',
      diagnosis: 'IMC entre 30 y 34.9.',
      diferenciales: 'Hipotiroidismo, síndrome metabólico.',
      tratamiento: 'Educación alimentaria + actividad física.',
      objetivo: 'Reducir 5%-10% del peso corporal.',
    },
  ],
  records: [
    {
      id: crypto.randomUUID(),
      nombre: 'Ana García',
      datos: '39 años · Femenino',
      peso: '92 kg',
      talla: '1.64 m',
      incompatibilidades: 'Gluten',
      alergias: 'Pescado',
      antecedentes: 'Diabetes tipo 2 materna',
      asociadas: 'Obesidad grado I',
    },
  ],
}

const createFormState = (fields) =>
  fields.reduce((result, field) => {
    result[field.name] = ''
    return result
  }, {})

function CatalogSection({ title, fields, items, formState, onChange, onSubmit }) {
  return (
    <SectionCard>
      <h2>{title}</h2>
      <Grid>
        {fields.map((field) => (
          <Field key={field.name}>
            <span>{field.label}</span>
            <Input
              value={formState[field.name]}
              onChange={(event) => onChange(field.name, event.target.value)}
              placeholder={`Ingrese ${field.label.toLowerCase()}`}
            />
          </Field>
        ))}
      </Grid>
      <PrimaryButton type="button" onClick={onSubmit}>
        Guardar registro
      </PrimaryButton>

      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            {fields.map((field) => (
              <Line key={`${item.id}-${field.name}`}>
                <strong>{field.label}:</strong> {item[field.name]}
              </Line>
            ))}
          </ListItem>
        ))}
        {items.length === 0 && <p>No hay registros todavía.</p>}
      </List>
    </SectionCard>
  )
}

function App() {
  const [currentTab, setCurrentTab] = useState('foods')
  const [user, setUser] = useState(null)
  const [loginForm, setLoginForm] = useState({ nombre: '', email: '' })
  const [loginError, setLoginError] = useState('')

  const [foods, setFoods] = useState(initialData.foods)
  const [nutrients, setNutrients] = useState(initialData.nutrients)
  const [vitamins, setVitamins] = useState(initialData.vitamins)
  const [diets, setDiets] = useState(initialData.diets)
  const [conditions, setConditions] = useState(initialData.conditions)
  const [records, setRecords] = useState(initialData.records)

  const [foodForm, setFoodForm] = useState(createFormState(configuration.foods.fields))
  const [nutrientForm, setNutrientForm] = useState(createFormState(configuration.nutrients.fields))
  const [vitaminForm, setVitaminForm] = useState(createFormState(configuration.vitamins.fields))
  const [dietForm, setDietForm] = useState(createFormState(configuration.diets.fields))
  const [conditionForm, setConditionForm] = useState(createFormState(configuration.conditions.fields))
  const [recordForm, setRecordForm] = useState(createFormState(configuration.records.fields))

  const [assignment, setAssignment] = useState({
    recordId: '',
    conditionId: '',
    dietId: '',
    observaciones: '',
  })
  const [diagnoses, setDiagnoses] = useState([])

  const createCatalogHandlers = (fields, formState, setForm, items, setItems) => ({
    onChange: (name, value) => setForm((current) => ({ ...current, [name]: value })),
    onSubmit: () => {
      if (fields.some((field) => !formState[field.name].trim())) {
        return
      }
      setItems((current) => [...current, { id: crypto.randomUUID(), ...formState }])
      setForm(createFormState(fields))
    },
    items,
    formState,
  })

  const foodHandlers = createCatalogHandlers(
    configuration.foods.fields,
    foodForm,
    setFoodForm,
    foods,
    setFoods,
  )
  const nutrientHandlers = createCatalogHandlers(
    configuration.nutrients.fields,
    nutrientForm,
    setNutrientForm,
    nutrients,
    setNutrients,
  )
  const vitaminHandlers = createCatalogHandlers(
    configuration.vitamins.fields,
    vitaminForm,
    setVitaminForm,
    vitamins,
    setVitamins,
  )
  const dietHandlers = createCatalogHandlers(
    configuration.diets.fields,
    dietForm,
    setDietForm,
    diets,
    setDiets,
  )
  const conditionHandlers = createCatalogHandlers(
    configuration.conditions.fields,
    conditionForm,
    setConditionForm,
    conditions,
    setConditions,
  )
  const recordHandlers = createCatalogHandlers(
    configuration.records.fields,
    recordForm,
    setRecordForm,
    records,
    setRecords,
  )

  const selectedCondition = conditions.find((condition) => condition.id === assignment.conditionId)
  const selectedPatient = records.find((record) => record.id === assignment.recordId)
  const selectedDiet = diets.find((diet) => diet.id === assignment.dietId)

  const splitTerms = (value = '') =>
    value
      .toLowerCase()
      .split(/[,;]+/)
      .map((term) => term.trim())
      .filter(Boolean)

  const getDietConflicts = (patient, diet) => {
    if (!patient || !diet) {
      return []
    }
    const restrictions = [...splitTerms(patient.alergias), ...splitTerms(patient.incompatibilidades)]
    const components = splitTerms(diet.componentes)
    return restrictions.filter((restriction) =>
      components.some((component) => component.includes(restriction) || restriction.includes(component)),
    )
  }

  const suggestedDiets = useMemo(() => {
    if (!selectedCondition) {
      return []
    }
    const conditionTerm = selectedCondition.nombre.toLowerCase().split(' ')[0]
    return diets.filter((diet) => diet.nombre.toLowerCase().includes(conditionTerm))
  }, [diets, selectedCondition])

  const selectedDietConflicts = getDietConflicts(selectedPatient, selectedDiet)

  const handleRegister = () => {
    const email = loginForm.email.trim().toLowerCase()
    const nombre = loginForm.nombre.trim()
    if (!nombre || !email) {
      setLoginError('Complete nombre y correo para continuar.')
      return
    }
    if (!email.endsWith('@gmail.com')) {
      setLoginError('Solo se permite registro con cuenta de Google (@gmail.com).')
      return
    }
    setUser({ nombre, email })
    setLoginError('')
  }

  const handleSaveDiagnosis = () => {
    if (!assignment.recordId || !assignment.conditionId || !assignment.dietId || selectedDietConflicts.length > 0) {
      return
    }

    setDiagnoses((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        patient: selectedPatient?.nombre,
        condition: selectedCondition?.nombre,
        diet: selectedDiet?.nombre,
        observaciones: assignment.observaciones,
      },
    ])

    setAssignment({ recordId: '', conditionId: '', dietId: '', observaciones: '' })
  }

  if (!user) {
    return (
      <>
        <GlobalStyle />
        <AuthLayout>
          <AuthCard>
            <h1>Dietas al Día</h1>
            <p>Registro seguro para médicos nutricionistas.</p>
            <Field>
              <span>Nombre completo</span>
              <Input
                value={loginForm.nombre}
                onChange={(event) => setLoginForm((current) => ({ ...current, nombre: event.target.value }))}
                placeholder="Ingrese su nombre"
              />
            </Field>
            <Field>
              <span>Correo Google</span>
              <Input
                value={loginForm.email}
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="nombre@gmail.com"
              />
            </Field>
            {loginError && <ErrorLabel>{loginError}</ErrorLabel>}
            <PrimaryButton type="button" onClick={handleRegister}>
              Registrarse con Google
            </PrimaryButton>
          </AuthCard>
        </AuthLayout>
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header>
          <div>
            <h1>Dietas al Día</h1>
            <p>{user.nombre} · {user.email}</p>
          </div>
        </Header>

        <TabRow>
          {appTabs.map((tab) => (
            <TabButton
              type="button"
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              $active={currentTab === tab.id}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabRow>

        {currentTab === 'foods' && (
          <CatalogSection
            title={configuration.foods.title}
            fields={configuration.foods.fields}
            {...foodHandlers}
          />
        )}

        {currentTab === 'nutrients' && (
          <CatalogSection
            title={configuration.nutrients.title}
            fields={configuration.nutrients.fields}
            {...nutrientHandlers}
          />
        )}

        {currentTab === 'vitamins' && (
          <CatalogSection
            title={configuration.vitamins.title}
            fields={configuration.vitamins.fields}
            {...vitaminHandlers}
          />
        )}

        {currentTab === 'diets' && (
          <CatalogSection
            title={configuration.diets.title}
            fields={configuration.diets.fields}
            {...dietHandlers}
          />
        )}

        {currentTab === 'conditions' && (
          <CatalogSection
            title={configuration.conditions.title}
            fields={configuration.conditions.fields}
            {...conditionHandlers}
          />
        )}

        {currentTab === 'records' && (
          <CatalogSection
            title={configuration.records.title}
            fields={configuration.records.fields}
            {...recordHandlers}
          />
        )}

        {currentTab === 'diagnosis' && (
          <SectionCard>
            <h2>Diagnóstico y asignación de dieta</h2>
            <Grid>
              <Field>
                <span>Paciente</span>
                <Select
                  value={assignment.recordId}
                  onChange={(event) => {
                    const recordId = event.target.value
                    const record = records.find((item) => item.id === recordId)
                    const condition = conditions.find((item) =>
                      record?.asociadas?.toLowerCase().includes(item.nombre.toLowerCase()),
                    )
                    setAssignment((current) => ({
                      ...current,
                      recordId,
                      conditionId: condition?.id || '',
                      dietId: '',
                    }))
                  }}
                >
                  <option value="">Seleccione paciente</option>
                  {records.map((record) => (
                    <option key={record.id} value={record.id}>
                      {record.nombre}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <span>Diagnóstico</span>
                <Select
                  value={assignment.conditionId}
                  onChange={(event) =>
                    setAssignment((current) => ({ ...current, conditionId: event.target.value, dietId: '' }))
                  }
                >
                  <option value="">Seleccione diagnóstico</option>
                  {conditions.map((condition) => (
                    <option key={condition.id} value={condition.id}>
                      {condition.nombre}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <span>Dieta asignada</span>
                <Select
                  value={assignment.dietId}
                  onChange={(event) =>
                    setAssignment((current) => ({ ...current, dietId: event.target.value }))
                  }
                >
                  <option value="">Seleccione dieta</option>
                  {(suggestedDiets.length > 0 ? suggestedDiets : diets).map((diet) => (
                    <option key={diet.id} value={diet.id}>
                      {diet.nombre}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <span>Observaciones</span>
                <Input
                  value={assignment.observaciones}
                  onChange={(event) =>
                    setAssignment((current) => ({ ...current, observaciones: event.target.value }))
                  }
                  placeholder="Plan de seguimiento"
                />
              </Field>
            </Grid>
            {selectedPatient && (
              <InfoBox>
                <strong>Paciente seleccionado:</strong> {selectedPatient.nombre}
                <br />
                <strong>Restricciones activas:</strong>{' '}
                {[selectedPatient.alergias, selectedPatient.incompatibilidades].filter(Boolean).join(' · ') || 'Ninguna registrada'}
              </InfoBox>
            )}

            {selectedDiet && selectedDietConflicts.length > 0 && (
              <AlertBox role="alert">
                <strong>ALERTA: dieta incompatible</strong>
                <p>
                  No se puede confirmar porque contiene: {selectedDietConflicts.join(', ')}.
                </p>
              </AlertBox>
            )}

            {selectedDiet && selectedDietConflicts.length === 0 && (
              <DietDetail>
                <h3>Ficha técnica · {selectedDiet.nombre}</h3>
                {configuration.diets.fields.slice(1).map((field) => (
                  <Line key={field.name}>
                    <strong>{field.label}:</strong> {selectedDiet[field.name]}
                  </Line>
                ))}
              </DietDetail>
            )}

            <PrimaryButton
              type="button"
              onClick={handleSaveDiagnosis}
              disabled={!assignment.recordId || !assignment.conditionId || !assignment.dietId || selectedDietConflicts.length > 0}
            >
              Registrar diagnóstico
            </PrimaryButton>

            {selectedCondition && (
              <InfoBox>
                <strong>Tratamiento sugerido:</strong> {selectedCondition.tratamiento}
                <br />
                <strong>Dietas relacionadas:</strong>{' '}
                {suggestedDiets.length > 0
                  ? suggestedDiets.map((diet) => diet.nombre).join(', ')
                  : 'No hay sugerencias automáticas para este diagnóstico.'}
              </InfoBox>
            )}

            <List>
              {diagnoses.map((diagnosis) => (
                <ListItem key={diagnosis.id}>
                  <Line><strong>Paciente:</strong> {diagnosis.patient}</Line>
                  <Line><strong>Diagnóstico:</strong> {diagnosis.condition}</Line>
                  <Line><strong>Dieta:</strong> {diagnosis.diet}</Line>
                  <Line><strong>Observaciones:</strong> {diagnosis.observaciones || 'Sin observaciones'}</Line>
                </ListItem>
              ))}
              {diagnoses.length === 0 && <p>Sin diagnósticos registrados.</p>}
            </List>
          </SectionCard>
        )}
      </Page>
    </>
  )
}

const Page = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem;
`

const Header = styled.header`
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;

  h1 {
    margin: 0;
    color: #14532d;
  }

  p {
    margin: 0.25rem 0 0;
    color: #3f4c59;
  }
`

const TabRow = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const TabButton = styled.button`
  border: 1px solid ${({ $active }) => ($active ? '#0f766e' : '#c7d6de')};
  background: ${({ $active }) => ($active ? '#0f766e' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f2937')};
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
`

const SectionCard = styled.section`
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-radius: 14px;
  padding: 1rem;

  h2 {
    margin: 0 0 1rem;
    color: #115e59;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #253244;
  font-size: 0.92rem;
`

const Input = styled.input`
  border: 1px solid #c7d6de;
  border-radius: 9px;
  padding: 0.6rem 0.75rem;
  background: #f8fbff;
`

const Select = styled.select`
  border: 1px solid #c7d6de;
  border-radius: 9px;
  padding: 0.6rem 0.75rem;
  background: #f8fbff;
`

const PrimaryButton = styled.button`
  margin-top: 1rem;
  background: #0f766e;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  padding: 0.65rem 1rem;
  cursor: pointer;

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`

const List = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.75rem;
`

const ListItem = styled.article`
  border: 1px solid #d7e6e0;
  border-radius: 10px;
  padding: 0.8rem;
  background: #f9fffd;
`

const Line = styled.p`
  margin: 0.2rem 0;
  color: #1f2937;
`

const AuthLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.25rem;
`

const AuthCard = styled.section`
  width: min(460px, 100%);
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #d7e6e0;
  padding: 1.3rem;

  h1 {
    margin: 0;
    color: #14532d;
  }

  p {
    color: #3f4c59;
    margin-top: 0.4rem;
  }
`

const ErrorLabel = styled.span`
  display: block;
  margin-top: 0.7rem;
  color: #b91c1c;
  font-size: 0.9rem;
`

const InfoBox = styled.div`
  margin-top: 1rem;
  border: 1px dashed #0f766e;
  border-radius: 8px;
  background: #ecfdf5;
  padding: 0.75rem;
  color: #134e4a;
`

const AlertBox = styled.div`
  margin-top: 1rem;
  border: 2px solid #b91c1c;
  border-radius: 8px;
  background: #fef2f2;
  padding: 0.85rem;
  color: #7f1d1d;

  p {
    margin: 0.35rem 0 0;
  }
`

const DietDetail = styled.div`
  margin-top: 1rem;
  border: 1px solid #99f6e4;
  border-radius: 8px;
  background: #f0fdfa;
  padding: 0.85rem;

  h3 {
    margin: 0 0 0.6rem;
    color: #115e59;
  }
`

export default App
