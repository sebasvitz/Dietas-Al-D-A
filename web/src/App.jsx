import { useMemo, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import AssignmentView from './components/AssignmentView.jsx'
import CatalogSection from './components/CatalogSection.jsx'
import EvalPanel from './components/EvalPanel.jsx'
import { Field, Input, PrimaryButton, SecondaryButton } from './components/ui.js'
import { catalogConfig, catalogTabs } from './data/catalogConfig.js'
import { allergenTags, initialData } from './data/seed.js'

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

  :focus-visible {
    outline: 3px solid #0f766e;
    outline-offset: 2px;
  }
`

const ASSIGNMENT_TAB = 'assignment'

function App() {
  const [currentTab, setCurrentTab] = useState(ASSIGNMENT_TAB)
  const [user, setUser] = useState(null)
  const [loginForm, setLoginForm] = useState({ nombre: '', email: '' })
  const [loginError, setLoginError] = useState('')
  const [catalogs, setCatalogs] = useState({
    foods: initialData.foods,
    nutrients: initialData.nutrients,
    vitamins: initialData.vitamins,
    diets: initialData.diets,
    conditions: initialData.conditions,
    records: initialData.records,
  })
  const [assignments, setAssignments] = useState([])
  const [evalMode] = useState(() => new URLSearchParams(window.location.search).get('eval') === '1')

  const optionsByField = useMemo(
    () => ({
      alergenos: allergenTags,
      alergias: allergenTags,
      incompatibilidades: allergenTags,
      alimentosIds: catalogs.foods.map((food) => ({ value: food.id, label: food.nombre })),
      enfermedadesIds: catalogs.conditions.map((condition) => ({ value: condition.id, label: condition.nombre })),
    }),
    [catalogs.foods, catalogs.conditions],
  )

  const addItem = (key, values) =>
    setCatalogs((current) => ({ ...current, [key]: [...current[key], { id: crypto.randomUUID(), ...values }] }))

  // Cada asignación queda con id y fecha/hora para la auditoría (RF-11).
  const handleAssign = (assignment) =>
    setAssignments((current) => [...current, { id: crypto.randomUUID(), ts: Date.now(), ...assignment }])

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

  const handleDemoLogin = () => {
    setUser({ nombre: 'Dr. Demo', email: 'demo@gmail.com' })
    setLoginError('')
  }

  if (!user) {
    return (
      <>
        <GlobalStyle />
        <AuthLayout>
          <AuthCard>
            <h1>Dietas al Día</h1>
            <p>Registro seguro para médicos nutricionistas.</p>
            <Notice>Acceso simulado para el prototipo: no se conecta con Google.</Notice>
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
            {loginError && <ErrorLabel role="alert">{loginError}</ErrorLabel>}
            <Actions>
              <PrimaryButton type="button" onClick={handleRegister}>
                Registrarse con Google
              </PrimaryButton>
              <SecondaryButton type="button" onClick={handleDemoLogin}>
                Entrar con datos demo
              </SecondaryButton>
            </Actions>
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

        <TabRow aria-label="Secciones">
          <TabButton
            type="button"
            onClick={() => setCurrentTab(ASSIGNMENT_TAB)}
            $active={currentTab === ASSIGNMENT_TAB}
            aria-current={currentTab === ASSIGNMENT_TAB ? 'page' : undefined}
          >
            Asignar tratamiento
          </TabButton>
          <TabGroupLabel>Catálogos:</TabGroupLabel>
          {catalogTabs.map((tab) => (
            <TabButton
              type="button"
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              $active={currentTab === tab.id}
              aria-current={currentTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabRow>

        {currentTab === ASSIGNMENT_TAB && (
          <AssignmentView
            records={catalogs.records}
            conditions={catalogs.conditions}
            diets={catalogs.diets}
            foods={catalogs.foods}
            allergenTags={allergenTags}
            assignments={assignments}
            onAssign={handleAssign}
          />
        )}

        {catalogTabs.map(
          (tab) =>
            currentTab === tab.id && (
              <CatalogSection
                key={tab.id}
                title={catalogConfig[tab.id].title}
                fields={catalogConfig[tab.id].fields}
                items={catalogs[tab.id]}
                optionsByField={optionsByField}
                onAdd={(values) => addItem(tab.id, values)}
              />
            ),
        )}
      </Page>
      {evalMode && <EvalPanel assignments={assignments} />}
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
  align-items: center;
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
  font: inherit;
`

const TabGroupLabel = styled.span`
  margin-left: 0.75rem;
  color: #475569;
  font-size: 0.9rem;
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

  label {
    margin-top: 0.75rem;
  }
`

const Notice = styled.div`
  background: #f1f5f9;
  border: 1px solid #94a3b8;
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  color: #334155;
  font-size: 0.9rem;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;

  button {
    margin-top: 1rem;
  }
`

const ErrorLabel = styled.span`
  display: block;
  margin-top: 0.7rem;
  color: #b91c1c;
  font-size: 0.9rem;
`

export default App
