import assert from 'node:assert/strict'
import { test } from 'node:test'
import { initialData } from '../data/seed.js'
import {
  calcImc,
  getConfirmationRequirements,
  getDietConflicts,
  getDietStatus,
  getMissingConfirmationSteps,
  sortEntriesBySafety,
} from './conflicts.js'

const foodsById = Object.fromEntries(initialData.foods.map((food) => [food.id, food]))
const patient = (id) => initialData.records.find((record) => record.id === id)
const diet = (id) => initialData.diets.find((item) => item.id === id)
const statusFor = (patientId, dietId) => getDietStatus(getDietConflicts(patient(patientId), diet(dietId), foodsById))

test('dieta segura para Ana García', () => {
  assert.deepEqual(getDietConflicts(patient('pac-ana'), diet('diet-hipocalorica'), foodsById), [])
  assert.equal(statusFor('pac-ana', 'diet-hipocalorica'), 'segura')
})

test('alergia a pescado detecta salmón', () => {
  const conflicts = getDietConflicts(patient('pac-ana'), diet('diet-obesidad-pescado'), foodsById)
  assert.ok(conflicts.some((c) => c.foodName === 'Salmón' && c.tag === 'pescado' && c.tipo === 'alergia'))
})

test('incompatibilidad a gluten detecta avena (no solo palabras literales)', () => {
  const conflicts = getDietConflicts(patient('pac-ana'), diet('diet-obesidad-pescado'), foodsById)
  assert.ok(conflicts.some((c) => c.foodName === 'Avena' && c.tag === 'gluten' && c.tipo === 'incompatibilidad'))
})

test('alergia e incompatibilidad a la vez: el estado es alergia', () => {
  assert.equal(statusFor('pac-ana', 'diet-obesidad-pescado'), 'alergia')
})

test('solo incompatibilidad: la dieta mediterránea con pan de trigo', () => {
  assert.equal(statusFor('pac-ana', 'diet-mediterranea'), 'incompatibilidad')
})

test('alergia a frutos secos en Carlos Ruiz', () => {
  assert.equal(statusFor('pac-carlos', 'diet-diabetica-frutos-secos'), 'alergia')
  assert.equal(statusFor('pac-carlos', 'diet-control-glucemico'), 'segura')
})

test('incompatibilidad a lácteos en Marta Londoño', () => {
  assert.equal(statusFor('pac-marta', 'diet-rica-hierro'), 'incompatibilidad')
  assert.equal(statusFor('pac-marta', 'diet-hierro-sin-lacteos'), 'segura')
})

test('paciente sin restricciones no genera conflictos', () => {
  const sinRestricciones = { alergias: [], incompatibilidades: [], alergiasRegistradas: true }
  assert.deepEqual(getDietConflicts(sinRestricciones, diet('diet-obesidad-pescado'), foodsById), [])
})

test('paciente o dieta inexistente devuelve lista vacía', () => {
  assert.deepEqual(getDietConflicts(undefined, diet('diet-hipocalorica'), foodsById), [])
  assert.deepEqual(getDietConflicts(patient('pac-ana'), undefined, foodsById), [])
})

test('las seguras se ordenan primero', () => {
  const entries = initialData.diets
    .filter((item) => item.enfermedadesIds.includes('cond-obesidad-1'))
    .map((item) => ({ diet: item, status: statusFor('pac-ana', item.id) }))
  assert.deepEqual(sortEntriesBySafety(entries).map((e) => e.status), ['segura', 'incompatibilidad', 'alergia'])
})

test('requisitos de confirmación por estado', () => {
  const ana = patient('pac-ana')
  assert.equal(getConfirmationRequirements(ana, 'alergia').blocked, true)
  assert.equal(getConfirmationRequirements(ana, 'incompatibilidad').needsJustification, true)
  assert.equal(getConfirmationRequirements(ana, 'segura').blocked, false)
  assert.equal(getConfirmationRequirements(patient('pac-luis'), 'segura').needsAllergyCheck, true)
})

test('faltantes para confirmar', () => {
  const ana = patient('pac-ana')
  const empty = { acknowledged: false, justification: '', allergyChecked: false }
  assert.deepEqual(getMissingConfirmationSteps(getConfirmationRequirements(ana, 'segura'), empty), [])
  assert.equal(getMissingConfirmationSteps(getConfirmationRequirements(ana, 'alergia'), empty).length, 1)
  assert.equal(getMissingConfirmationSteps(getConfirmationRequirements(ana, 'incompatibilidad'), empty).length, 2)
  const ok = { acknowledged: true, justification: 'Se controlará el gluten con el paciente', allergyChecked: false }
  assert.deepEqual(getMissingConfirmationSteps(getConfirmationRequirements(ana, 'incompatibilidad'), ok), [])
  assert.equal(getMissingConfirmationSteps(getConfirmationRequirements(patient('pac-luis'), 'segura'), empty).length, 1)
})

test('cálculo de IMC', () => {
  assert.equal(calcImc(92, 1.64), 34.2)
  assert.equal(calcImc(0, 1.6), null)
})

test('los datos demo son consistentes (alimentos y enfermedades existen)', () => {
  const conditionIds = new Set(initialData.conditions.map((c) => c.id))
  for (const d of initialData.diets) {
    d.alimentosIds.forEach((id) => assert.ok(foodsById[id], `alimento ${id} no existe`))
    d.enfermedadesIds.forEach((id) => assert.ok(conditionIds.has(id), `enfermedad ${id} no existe`))
  }
  for (const r of initialData.records) {
    r.enfermedadesIds.forEach((id) => assert.ok(conditionIds.has(id), `enfermedad ${id} no existe`))
  }
})

test('Hipertensión arterial queda sin dietas (prueba del estado vacío)', () => {
  assert.equal(initialData.diets.filter((d) => d.enfermedadesIds.includes('cond-hipertension')).length, 0)
})
