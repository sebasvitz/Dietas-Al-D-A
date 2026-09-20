import { Fragment } from 'react'
import styled from 'styled-components'
import { dietSheetFields } from '../data/catalogConfig.js'
import { BlockIcon, Chip, StatusBadge, WarningIcon } from './indicators.jsx'
import { Line } from './ui.js'

const Sheet = styled.div`
  header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  h3 {
    margin: 0;
    color: #115e59;
  }
`

const Foods = styled.ul`
  list-style: none;
  margin: 0.3rem 0 0.6rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

const FoodChip = styled.li`
  border: 1px solid #99c9c0;
  background: #f0fdfa;
  border-radius: 999px;
  padding: 0.15rem 0.65rem;
  font-size: 0.9rem;
`

export default function DietSheet({ diet, status, foodsById, conflicts, tagLabels }) {
  const conflictsByFood = {}
  for (const conflict of conflicts) {
    conflictsByFood[conflict.foodId] = [...(conflictsByFood[conflict.foodId] ?? []), conflict]
  }

  const foodItems = diet.alimentosIds.map((foodId) => {
    const name = foodsById[foodId]?.nombre ?? foodId
    const foodConflicts = conflictsByFood[foodId] ?? []
    if (foodConflicts.length === 0) {
      return <FoodChip key={foodId}>{name}</FoodChip>
    }
    const isAllergy = foodConflicts.some((conflict) => conflict.tipo === 'alergia')
    const detail = foodConflicts
      .map((conflict) => `${conflict.tipo} a ${(tagLabels[conflict.tag] ?? conflict.tag).toLowerCase()}`)
      .join(' y ')
    return (
      <li key={foodId}>
        <Chip $tone={isAllergy ? 'danger' : 'warning'}>
          {isAllergy ? <BlockIcon /> : <WarningIcon />}
          {name}: {detail}
        </Chip>
      </li>
    )
  })

  return (
    <Sheet data-rf="RF-07">
      <header>
        <h3>Ficha técnica · {diet.nombre}</h3>
        <StatusBadge status={status} />
      </header>
      {dietSheetFields.map((field) => (
        <Fragment key={field.name}>
          <Line>
            <strong>{field.label}:</strong> {diet[field.name]}
          </Line>
          {field.name === 'calorias' && (
            <>
              <Line>
                <strong>Componentes (alimentos):</strong>
              </Line>
              <Foods>{foodItems}</Foods>
            </>
          )}
        </Fragment>
      ))}
    </Sheet>
  )
}
