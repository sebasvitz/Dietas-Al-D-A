import styled from 'styled-components'
import { calcImc } from '../utils/conflicts.js'
import { BlockIcon, CheckIcon, Chip, WarningIcon } from './indicators.jsx'

const Banner = styled.section`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffff;
  border: 1px solid #99c9c0;
  border-left: 6px solid #0f766e;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(15, 118, 110, 0.12);

  h2 {
    margin: 0;
    font-size: 1.15rem;
    color: #0f172a;
  }

  p {
    margin: 0.15rem 0 0.5rem;
    color: #334155;
    font-size: 0.92rem;
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

export default function PatientBanner({ patient, condition, tagLabels }) {
  const imc = calcImc(patient.pesoKg, patient.tallaM)
  const alergias = patient.alergias ?? []
  const incompatibilidades = patient.incompatibilidades ?? []

  return (
    <Banner data-rf="RF-01" aria-label="Contexto del paciente">
      <h2>{patient.nombre}</h2>
      <p>
        {patient.edad} años · {patient.sexo} · {patient.pesoKg} kg · {patient.tallaM} m
        {imc ? ` · IMC ${imc}` : ''}
        {condition ? ` · Diagnóstico: ${condition.nombre}` : ''}
      </p>
      <Chips>
        {alergias.map((tag) => (
          <Chip key={`a-${tag}`} $tone="danger">
            <BlockIcon />
            Alergia: {tagLabels[tag] ?? tag}
          </Chip>
        ))}
        {incompatibilidades.map((tag) => (
          <Chip key={`i-${tag}`} $tone="warning">
            <WarningIcon />
            Incompatibilidad: {tagLabels[tag] ?? tag}
          </Chip>
        ))}
        {patient.alergiasRegistradas === false && (
          <Chip $tone="warning">
            <WarningIcon />
            Alergias no registradas: verifique con el paciente
          </Chip>
        )}
        {patient.alergiasRegistradas !== false && alergias.length === 0 && incompatibilidades.length === 0 && (
          <Chip $tone="neutral">
            <CheckIcon />
            Sin alergias ni incompatibilidades conocidas
          </Chip>
        )}
      </Chips>
    </Banner>
  )
}
