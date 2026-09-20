import styled from 'styled-components'

// Componentes de interfaz compartidos (movidos desde App.jsx sin cambios de estilo,
// salvo el estado deshabilitado de PrimaryButton, que ahora conserva el contraste).

export const SectionCard = styled.section`
  background: #ffffff;
  border: 1px solid #d7e6e0;
  border-radius: 14px;
  padding: 1rem;

  h2 {
    margin: 0 0 1rem;
    color: #115e59;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #253244;
  font-size: 0.92rem;
`

export const Input = styled.input`
  border: 1px solid #c7d6de;
  border-radius: 9px;
  padding: 0.6rem 0.75rem;
  background: #f8fbff;
`

export const Select = styled.select`
  border: 1px solid #c7d6de;
  border-radius: 9px;
  padding: 0.6rem 0.75rem;
  background: #f8fbff;
`

export const TextArea = styled.textarea`
  border: 1px solid #c7d6de;
  border-radius: 9px;
  padding: 0.6rem 0.75rem;
  background: #f8fbff;
  font: inherit;
  resize: vertical;
  min-height: 4.5rem;
`

export const PrimaryButton = styled.button`
  margin-top: 1rem;
  background: #0f766e;
  color: #ffffff;
  border: 1px solid #0f766e;
  border-radius: 9px;
  padding: 0.65rem 1rem;
  cursor: pointer;
  font: inherit;
  font-weight: 600;

  &:disabled {
    background: #e2e8f0;
    border-color: #94a3b8;
    color: #475569;
    cursor: not-allowed;
  }
`

export const SecondaryButton = styled.button`
  background: #ffffff;
  color: #0f766e;
  border: 1px solid #0f766e;
  border-radius: 9px;
  padding: 0.5rem 0.85rem;
  cursor: pointer;
  font: inherit;
  font-weight: 600;

  &[aria-pressed='true'] {
    background: #0f766e;
    color: #ffffff;
  }
`

export const List = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.75rem;
`

export const ListItem = styled.article`
  border: 1px solid #d7e6e0;
  border-radius: 10px;
  padding: 0.8rem;
  background: #f9fffd;
`

export const Line = styled.p`
  margin: 0.2rem 0;
  color: #1f2937;
`

export const InfoBox = styled.div`
  margin-top: 1rem;
  border: 1px dashed #0f766e;
  border-radius: 8px;
  background: #ecfdf5;
  padding: 0.75rem;
  color: #134e4a;
`

export const CheckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  color: #1f2937;
  font-size: 0.95rem;
  cursor: pointer;

  input {
    margin-top: 0.2rem;
    width: 1.1rem;
    height: 1.1rem;
    flex: none;
  }
`
