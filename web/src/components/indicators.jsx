import styled from 'styled-components'
import { STATUS_TONE, tones } from './tones.js'

// Iconos e indicadores de estado. Nunca se comunica un estado solo con color:
// siempre van icono + texto.

const iconProps = { width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': true, focusable: false, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const CheckIcon = () => (
  <svg {...iconProps}><path d="M3 8.5 6.5 12 13 4.5" /></svg>
)

export const WarningIcon = () => (
  <svg {...iconProps}><path d="M8 2 14.5 13.5h-13L8 2Z" /><path d="M8 6.5v3.2M8 11.6v.1" /></svg>
)

export const BlockIcon = () => (
  <svg {...iconProps}><circle cx="8" cy="8" r="6" /><path d="M3.8 12.2 12.2 3.8" /></svg>
)

const STATUS_META = {
  segura: { label: 'Segura', Icon: CheckIcon },
  incompatibilidad: { label: 'Incompatibilidad', Icon: WarningIcon },
  alergia: { label: 'Alergia', Icon: BlockIcon },
}

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid ${({ $tone }) => tones[$tone].border};
  background: ${({ $tone }) => tones[$tone].background};
  color: ${({ $tone }) => tones[$tone].color};

  svg {
    flex: none;
  }
`

export function StatusBadge({ status }) {
  const { label, Icon } = STATUS_META[status]
  return (
    <Chip $tone={STATUS_TONE[status]}>
      <Icon />
      {label}
    </Chip>
  )
}
