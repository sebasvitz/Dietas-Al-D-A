import { useState } from 'react'
import styled from 'styled-components'
import { CheckRow, Field, Grid, Input, Line, List, ListItem, PrimaryButton, SectionCard, Select } from './ui.js'

const Group = styled.fieldset`
  border: 1px solid #c7d6de;
  border-radius: 9px;
  padding: 0.5rem 0.75rem 0.65rem;
  margin: 0;
  background: #f8fbff;
  display: grid;
  gap: 0.35rem;

  legend {
    padding: 0 0.3rem;
    color: #253244;
    font-size: 0.92rem;
  }
`

const FormError = styled.p`
  margin: 0.75rem 0 0;
  color: #991b1b;
  font-weight: 600;
`

const createFormState = (fields) =>
  Object.fromEntries(
    fields.map((field) => [field.name, field.type === 'multiselect' ? [] : field.type === 'boolean' ? false : '']),
  )

const isEmpty = (field, value) => {
  if (field.type === 'multiselect') {
    return value.length === 0
  }
  if (field.type === 'boolean') {
    return false
  }
  return String(value).trim() === ''
}

const formatValue = (field, value, options) => {
  if (field.type === 'multiselect') {
    const labels = (value ?? []).map((item) => options.find((option) => option.value === item)?.label ?? item)
    return labels.length > 0 ? labels.join(', ') : 'Ninguno'
  }
  if (field.type === 'boolean') {
    return value ? 'Sí' : 'No'
  }
  if (value === '' || value === undefined) {
    return '—'
  }
  return field.unit ? `${value} ${field.unit}` : value
}

/**
 * Formulario + listado genérico de un catálogo.
 * `optionsByField` aporta las opciones de los campos `multiselect` (y `select` sin `options`).
 */
export default function CatalogSection({ title, fields, items, optionsByField, onAdd }) {
  const [form, setForm] = useState(() => createFormState(fields))
  const [error, setError] = useState('')

  const optionsFor = (field) => field.options ?? optionsByField[field.name] ?? []

  const handleSubmit = () => {
    const missing = fields.filter((field) => field.required !== false && isEmpty(field, form[field.name]))
    if (missing.length > 0) {
      setError(`Falta completar: ${missing.map((field) => field.label).join(', ')}.`)
      return
    }
    const values = Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.type === 'number' ? Number(form[field.name]) : typeof form[field.name] === 'string' ? form[field.name].trim() : form[field.name],
      ]),
    )
    onAdd(values)
    setForm(createFormState(fields))
    setError('')
  }

  const toggleOption = (name, value) =>
    setForm((current) => ({
      ...current,
      [name]: current[name].includes(value) ? current[name].filter((item) => item !== value) : [...current[name], value],
    }))

  const renderField = (field) => {
    if (field.type === 'multiselect') {
      return (
        <Group key={field.name}>
          <legend>{field.label}</legend>
          {optionsFor(field).length === 0 && <span>No hay opciones disponibles.</span>}
          {optionsFor(field).map((option) => (
            <CheckRow key={option.value}>
              <input
                type="checkbox"
                checked={form[field.name].includes(option.value)}
                onChange={() => toggleOption(field.name, option.value)}
              />
              {option.label}
            </CheckRow>
          ))}
        </Group>
      )
    }
    if (field.type === 'boolean') {
      return (
        <CheckRow key={field.name}>
          <input
            type="checkbox"
            checked={form[field.name]}
            onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))}
          />
          {field.label}
        </CheckRow>
      )
    }
    if (field.type === 'select') {
      return (
        <Field key={field.name}>
          <span>{field.label}</span>
          <Select
            value={form[field.name]}
            onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
          >
            <option value="">Seleccione</option>
            {optionsFor(field).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      )
    }
    return (
      <Field key={field.name}>
        <span>
          {field.label}
          {field.unit ? ` (${field.unit})` : ''}
          {field.required === false ? ' · opcional' : ''}
        </span>
        <Input
          type={field.type === 'number' ? 'number' : 'text'}
          step={field.type === 'number' ? 'any' : undefined}
          min={field.type === 'number' ? 0 : undefined}
          value={form[field.name]}
          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
          placeholder={`Ingrese ${field.label.toLowerCase()}`}
        />
      </Field>
    )
  }

  return (
    <SectionCard>
      <h2>{title}</h2>
      <Grid>{fields.map(renderField)}</Grid>
      {error && <FormError role="alert">{error}</FormError>}
      <PrimaryButton type="button" onClick={handleSubmit}>
        Guardar registro
      </PrimaryButton>

      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            {fields.map((field) => (
              <Line key={`${item.id}-${field.name}`}>
                <strong>{field.label}:</strong> {formatValue(field, item[field.name], optionsFor(field))}
              </Line>
            ))}
          </ListItem>
        ))}
        {items.length === 0 && <p>No hay registros todavía.</p>}
      </List>
    </SectionCard>
  )
}
