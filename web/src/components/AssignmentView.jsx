import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  getDietConflicts,
  getDietStatus,
  sortEntriesBySafety,
} from '../utils/conflicts.js'
import ConfirmPanel from './ConfirmPanel.jsx'
import DietCard from './DietCard.jsx'
import DietSheet from './DietSheet.jsx'
import PatientBanner from './PatientBanner.jsx'
import { CheckIcon, Chip, StatusBadge } from './indicators.jsx'
import { tones } from './tones.js'
import { CheckRow, Field, Line, ListItem, SecondaryButton, Select } from './ui.js'

const View = styled.section`
  display: grid;
  gap: 1rem;

  > h2 {
    margin: 0;
    color: #115e59;
  }

  > p {
    margin: -0.5rem 0 0;
    color: #3f4c59;
    max-width: 70ch;
  }
`

const Selectors = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-radius: 12px;
  padding: 0.85rem 1rem;

  ${Field} {
    min-width: min(320px, 100%);
    flex: 1 1 260px;
  }
`

const ConditionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  color: #253244;
`

const Layout = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  }
`

const Column = styled.div`
  display: grid;
  gap: 0.75rem;
`

const ListHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  h3 {
    margin: 0;
    color: #115e59;
    font-size: 1.05rem;
  }
`

const DetailPanel = styled.aside`
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-radius: 12px;
  padding: 1rem;
  scroll-margin-top: 9rem;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid #0f766e;
  }
`

const EmptyState = styled.div`
  border: 1px dashed #94a3b8;
  border-radius: 12px;
  background: #f8fafc;
  padding: 1rem;
  color: #334155;

  strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  p {
    margin: 0;
  }
`

const Success = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  border: 2px solid ${tones.ok.border};
  background: ${tones.ok.background};
  color: ${tones.ok.color};
  border-radius: 10px;
  padding: 0.75rem 0.9rem;

  svg {
    margin-top: 0.15rem;
    flex: none;
  }

  p {
    margin: 0.15rem 0 0;
  }
`

const History = styled.section`
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-radius: 12px;
  padding: 1rem;

  h3 {
    margin: 0 0 0.75rem;
    color: #115e59;
    font-size: 1.05rem;
  }
`

const formatDate = (timestamp) => new Date(timestamp).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })

export default function AssignmentView({ records, conditions, diets, foods, allergenTags, assignments, onAssign }) {
  const [patientId, setPatientId] = useState('')
  const [chosenConditionId, setChosenConditionId] = useState('')
  const [focusedDietId, setFocusedDietId] = useState('')
  const [onlySafe, setOnlySafe] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const panelRef = useRef(null)

  const foodsById = useMemo(() => Object.fromEntries(foods.map((food) => [food.id, food])), [foods])
  const conditionsById = useMemo(() => Object.fromEntries(conditions.map((item) => [item.id, item])), [conditions])
  const tagLabels = useMemo(() => Object.fromEntries(allergenTags.map((tag) => [tag.value, tag.label])), [allergenTags])

  const patient = records.find((record) => record.id === patientId)
  const patientConditions = (patient?.enfermedadesIds ?? []).map((id) => conditionsById[id]).filter(Boolean)
  const activeCondition =
    patientConditions.find((condition) => condition.id === chosenConditionId) ?? patientConditions[0]

  const entries =
    patient && activeCondition
      ? sortEntriesBySafety(
          diets
            .filter((diet) => (diet.enfermedadesIds ?? []).includes(activeCondition.id))
            .map((diet) => {
              const conflicts = getDietConflicts(patient, diet, foodsById)
              return { diet, conflicts, status: getDietStatus(conflicts) }
            }),
        )
      : []

  const visibleEntries = onlySafe ? entries.filter((entry) => entry.status === 'segura') : entries
  const safeCount = entries.filter((entry) => entry.status === 'segura').length
  const focusedEntry = entries.find((entry) => entry.diet.id === focusedDietId)

  useEffect(() => {
    if (!focusedDietId || !panelRef.current) {
      return
    }
    panelRef.current.focus({ preventScroll: true })
    if (window.matchMedia('(max-width: 959px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      panelRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
  }, [focusedDietId])

  const resetSelection = () => {
    setFocusedDietId('')
    setConfirmation(null)
  }

  const handleConfirm = (extra) => {
    const assignment = {
      patientId: patient.id,
      patient: patient.nombre,
      conditionId: activeCondition.id,
      condition: activeCondition.nombre,
      dietId: focusedEntry.diet.id,
      diet: focusedEntry.diet.nombre,
      ...extra,
    }
    onAssign(assignment)
    setConfirmation(assignment)
    setFocusedDietId('')
  }

  return (
    <View data-rf="RF-08" aria-label="Asignar tratamiento nutricional">
      <h2>Asignar tratamiento nutricional</h2>
      <p>
        Consulte las dietas compatibles con el diagnóstico del paciente, revise las alertas por alergias o
        incompatibilidades y confirme una dieta segura.
      </p>

      <Selectors>
        <Field>
          <span>Paciente</span>
          <Select
            value={patientId}
            onChange={(event) => {
              setPatientId(event.target.value)
              setChosenConditionId('')
              resetSelection()
            }}
          >
            <option value="">Seleccione un paciente</option>
            {records.map((record) => (
              <option key={record.id} value={record.id}>
                {record.nombre}
              </option>
            ))}
          </Select>
        </Field>
        {patient && patientConditions.length > 0 && (
          <ConditionRow data-rf="RF-02" role="group" aria-label="Diagnóstico">
            <span>Diagnóstico:</span>
            {patientConditions.length === 1 ? (
              <strong>{patientConditions[0].nombre}</strong>
            ) : (
              patientConditions.map((condition) => (
                <SecondaryButton
                  key={condition.id}
                  type="button"
                  aria-pressed={condition.id === activeCondition?.id}
                  onClick={() => {
                    setChosenConditionId(condition.id)
                    resetSelection()
                  }}
                >
                  {condition.nombre}
                </SecondaryButton>
              ))
            )}
          </ConditionRow>
        )}
      </Selectors>

      {patient && <PatientBanner patient={patient} condition={activeCondition} tagLabels={tagLabels} />}

      <div aria-live="polite">
        {confirmation && (
          <Success role="status" data-rf="RF-08">
            <CheckIcon />
            <div>
              <strong>Dieta asignada</strong>
              <p>
                Se asignó «{confirmation.diet}» a {confirmation.patient} para {confirmation.condition}.
              </p>
            </div>
          </Success>
        )}
      </div>

      {!patient && (
        <EmptyState data-rf="RF-10">
          <strong>Seleccione un paciente</strong>
          <p>Verá sus dietas asociadas al diagnóstico y las alertas por alergias o incompatibilidades.</p>
        </EmptyState>
      )}

      {patient && patientConditions.length === 0 && (
        <EmptyState data-rf="RF-10">
          <strong>Este paciente no tiene enfermedades registradas</strong>
          <p>Agregue una enfermedad a su historia clínica para consultar dietas asociadas.</p>
        </EmptyState>
      )}

      {patient && activeCondition && (
        <Layout>
          <Column>
            <ListHeader>
              <h3 aria-live="polite">
                {entries.length === 0
                  ? `Dietas para ${activeCondition.nombre}`
                  : `${entries.length} ${entries.length === 1 ? 'dieta asociada' : 'dietas asociadas'} a ${activeCondition.nombre} · ${safeCount} ${safeCount === 1 ? 'segura' : 'seguras'}`}
              </h3>
              {entries.length > 0 && (
                <CheckRow data-rf="RF-09">
                  <input type="checkbox" checked={onlySafe} onChange={(event) => setOnlySafe(event.target.checked)} />
                  Mostrar solo seguras
                </CheckRow>
              )}
            </ListHeader>

            {entries.length === 0 && (
              <EmptyState data-rf="RF-10">
                <strong>No hay dietas asociadas a este diagnóstico</strong>
                <p>El catálogo no tiene dietas para {activeCondition.nombre}. Agregue una en Catálogos → Dietas.</p>
              </EmptyState>
            )}

            {entries.length > 0 && visibleEntries.length === 0 && (
              <EmptyState data-rf="RF-10">
                <strong>Ninguna dieta asociada es segura para este paciente</strong>
                <p>Desactive el filtro para revisar las demás dietas y sus alertas.</p>
              </EmptyState>
            )}

            {visibleEntries.map((entry) => (
              <DietCard
                key={entry.diet.id}
                diet={entry.diet}
                status={entry.status}
                conflicts={entry.conflicts}
                tagLabels={tagLabels}
                selected={entry.diet.id === focusedDietId}
                onOpen={(dietId) => {
                  setFocusedDietId(dietId)
                  setConfirmation(null)
                }}
              />
            ))}
          </Column>

          <DetailPanel ref={panelRef} tabIndex={-1} aria-label="Ficha técnica y confirmación">
            {focusedEntry ? (
              <>
                <DietSheet
                  diet={focusedEntry.diet}
                  status={focusedEntry.status}
                  foodsById={foodsById}
                  conflicts={focusedEntry.conflicts}
                  tagLabels={tagLabels}
                />
                <ConfirmPanel
                  key={`${patient.id}-${focusedEntry.diet.id}`}
                  patient={patient}
                  status={focusedEntry.status}
                  conflicts={focusedEntry.conflicts}
                  tagLabels={tagLabels}
                  onConfirm={handleConfirm}
                />
              </>
            ) : (
              <EmptyState>
                <strong>Ficha técnica</strong>
                <p>Elija «Ver ficha y elegir» en una dieta para consultar su ficha completa y confirmarla aquí.</p>
              </EmptyState>
            )}
          </DetailPanel>
        </Layout>
      )}

      <History data-rf="RF-11">
        <h3>Asignaciones de esta sesión</h3>
        {assignments.length === 0 && <p>Todavía no hay asignaciones.</p>}
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {[...assignments].reverse().map((item) => (
            <ListItem key={item.id}>
              <Line>
                <strong>{item.patient}</strong> · {item.condition} · {formatDate(item.ts)}
              </Line>
              <Line>
                Dieta: {item.diet} <StatusBadge status={item.estado} />
              </Line>
              {item.alertasMostradas.length > 0 && (
                <Line>
                  Alertas mostradas:{' '}
                  {item.alertasMostradas.map((alert) => `${alert.foodName} (${tagLabels[alert.tag] ?? alert.tag})`).join(', ')}
                  {item.alertaReconocida ? ' · reconocida por el médico' : ''}
                </Line>
              )}
              {item.justificacion && <Line>Justificación: {item.justificacion}</Line>}
              {item.alergiasVerificadas === true && (
                <Chip $tone="neutral">Alergias verificadas con el paciente</Chip>
              )}
              {item.observaciones && <Line>Observaciones: {item.observaciones}</Line>}
            </ListItem>
          ))}
        </div>
      </History>
    </View>
  )
}
