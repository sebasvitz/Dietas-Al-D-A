import styled from 'styled-components'
import { PrimaryButton } from './ui.js'
import { StatusBadge } from './indicators.jsx'
import { STATUS_TONE, tones } from './tones.js'

const Card = styled.article`
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-left: 6px solid ${({ $tone }) => tones[$tone].border};
  border-radius: 12px;
  padding: 0.85rem 1rem;
  outline: ${({ $selected }) => ($selected ? '3px solid #0f766e' : 'none')};
  outline-offset: 2px;

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  h3 {
    margin: 0;
    font-size: 1.02rem;
    color: #0f172a;
  }

  p {
    margin: 0.3rem 0 0;
    color: #334155;
    font-size: 0.92rem;
  }

  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.1rem;
    color: ${({ $tone }) => tones[$tone].color};
    font-size: 0.92rem;
    font-weight: 600;
  }
`

const CardButton = styled(PrimaryButton)`
  margin-top: 0.75rem;
`

export default function DietCard({ diet, status, conflicts, selected, tagLabels, onOpen }) {
  const tone = STATUS_TONE[status]

  return (
    <Card $tone={tone} $selected={selected} data-rf="RF-03">
      <header>
        <h3>{diet.nombre}</h3>
        <StatusBadge status={status} />
      </header>
      <p>{diet.objetivos}</p>
      <p>
        {diet.calorias} · {diet.duracion}
      </p>
      {conflicts.length > 0 && (
        <ul data-rf="RF-05" aria-label="Alertas de esta dieta">
          {conflicts.map((conflict) => (
            <li key={`${conflict.foodId}-${conflict.tag}-${conflict.tipo}`}>
              Contiene {conflict.foodName} ({tagLabels[conflict.tag] ?? conflict.tag}):{' '}
              {conflict.tipo === 'alergia' ? 'alergia registrada' : 'incompatibilidad registrada'}
            </li>
          ))}
        </ul>
      )}
      <CardButton type="button" onClick={() => onOpen(diet.id)} aria-pressed={selected}>
        {selected ? 'Dieta en revisión' : 'Ver ficha y elegir'}
      </CardButton>
    </Card>
  )
}
