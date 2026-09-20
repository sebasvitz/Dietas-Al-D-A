import { useState } from 'react'
import styled from 'styled-components'
import {
  getConfirmationRequirements,
  getMissingConfirmationSteps,
  MIN_JUSTIFICATION_LENGTH,
} from '../utils/conflicts.js'
import { BlockIcon, WarningIcon } from './indicators.jsx'
import { tones } from './tones.js'
import { CheckRow, Field, Input, PrimaryButton, TextArea } from './ui.js'

const Panel = styled.section`
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #d7e6e0;
  display: grid;
  gap: 0.75rem;

  h3 {
    margin: 0;
    color: #115e59;
  }
`

const Notice = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  border: 2px solid ${({ $tone }) => tones[$tone].border};
  background: ${({ $tone }) => tones[$tone].background};
  color: ${({ $tone }) => tones[$tone].color};
  border-radius: 8px;
  padding: 0.75rem 0.85rem;

  svg {
    margin-top: 0.15rem;
    flex: none;
  }

  strong {
    display: block;
  }

  p {
    margin: 0.25rem 0 0;
  }
`

const Missing = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: #475569;
  font-size: 0.9rem;
`

export default function ConfirmPanel({ patient, status, conflicts, tagLabels, onConfirm }) {
  const [acknowledged, setAcknowledged] = useState(false)
  const [justification, setJustification] = useState('')
  const [allergyChecked, setAllergyChecked] = useState(false)
  const [observaciones, setObservaciones] = useState('')

  const requirements = getConfirmationRequirements(patient, status)
  const missing = getMissingConfirmationSteps(requirements, { acknowledged, justification, allergyChecked })
  const allergyConflicts = conflicts.filter((conflict) => conflict.tipo === 'alergia')
  const describe = (list) =>
    list.map((conflict) => `${conflict.foodName} (${tagLabels[conflict.tag] ?? conflict.tag})`).join(', ')

  const handleConfirm = () => {
    if (missing.length > 0) {
      return
    }
    onConfirm({
      estado: status,
      alertasMostradas: conflicts.map((conflict) => ({ ...conflict })),
      alertaReconocida: requirements.needsAcknowledgement ? acknowledged : false,
      justificacion: requirements.needsJustification ? justification.trim() : '',
      alergiasVerificadas: requirements.needsAllergyCheck ? allergyChecked : null,
      observaciones: observaciones.trim(),
    })
  }

  return (
    <Panel data-rf="RF-06 RF-08" aria-label="Confirmación de la asignación">
      <h3>Confirmar asignación</h3>

      {requirements.blocked && (
        <Notice $tone="danger" role="alert">
          <BlockIcon />
          <div>
            <strong>Alergia registrada: no se puede asignar esta dieta</strong>
            <p>El paciente es alérgico a: {describe(allergyConflicts)}. Elija otra dieta de la lista.</p>
          </div>
        </Notice>
      )}

      {requirements.needsAcknowledgement && (
        <>
          <Notice $tone="warning" role="alert">
            <WarningIcon />
            <div>
              <strong>Incompatibilidad registrada</strong>
              <p>Esta dieta contiene: {describe(conflicts.filter((conflict) => conflict.tipo === 'incompatibilidad'))}.</p>
            </div>
          </Notice>
          <CheckRow>
            <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />
            He revisado la alerta y asumo la decisión de asignar esta dieta.
          </CheckRow>
          <Field>
            <span>Justificación clínica (mínimo {MIN_JUSTIFICATION_LENGTH} caracteres)</span>
            <TextArea value={justification} onChange={(event) => setJustification(event.target.value)} />
          </Field>
        </>
      )}

      {requirements.needsAllergyCheck && (
        <>
          <Notice $tone="warning" role="alert">
            <WarningIcon />
            <div>
              <strong>Las alergias de este paciente no están registradas</strong>
              <p>El sistema no puede comprobar alergias. Verifíquelas con el paciente antes de asignar.</p>
            </div>
          </Notice>
          <CheckRow>
            <input type="checkbox" checked={allergyChecked} onChange={(event) => setAllergyChecked(event.target.checked)} />
            Verifiqué las alergias con el paciente.
          </CheckRow>
        </>
      )}

      {!requirements.blocked && (
        <Field>
          <span>Observaciones (opcional)</span>
          <Input
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
            placeholder="Plan de seguimiento"
          />
        </Field>
      )}

      <div>
        <PrimaryButton type="button" onClick={handleConfirm} disabled={missing.length > 0} style={{ marginTop: 0 }}>
          Confirmar asignación de dieta
        </PrimaryButton>
        {missing.length > 0 && !requirements.blocked && (
          <Missing aria-live="polite">
            {missing.map((step) => (
              <li key={step}>Falta: {step}</li>
            ))}
          </Missing>
        )}
        {requirements.blocked && (
          <Missing>
            <li>Bloqueada por alergia. Elija otra dieta para continuar.</li>
          </Missing>
        )}
      </div>
    </Panel>
  )
}
