// Lógica de cruce entre la historia clínica y el catálogo de dietas.
// Funciones puras: el cruce se hace por etiquetas de alérgenos, nunca por texto libre.

export const STATUS = {
  SEGURA: 'segura',
  INCOMPATIBILIDAD: 'incompatibilidad',
  ALERGIA: 'alergia',
}

const STATUS_ORDER = { segura: 0, incompatibilidad: 1, alergia: 2 }

/**
 * Devuelve los conflictos entre los alimentos de una dieta y las restricciones del paciente.
 * Cada conflicto: { foodId, foodName, tag, tipo: 'alergia' | 'incompatibilidad' }
 */
export function getDietConflicts(patient, diet, foodsById) {
  if (!patient || !diet) {
    return []
  }
  const alergias = new Set(patient.alergias ?? [])
  const incompatibilidades = new Set(patient.incompatibilidades ?? [])
  const conflicts = []

  for (const foodId of diet.alimentosIds ?? []) {
    const food = foodsById[foodId]
    if (!food) {
      continue
    }
    for (const tag of food.alergenos ?? []) {
      if (alergias.has(tag)) {
        conflicts.push({ foodId, foodName: food.nombre, tag, tipo: 'alergia' })
      }
      if (incompatibilidades.has(tag)) {
        conflicts.push({ foodId, foodName: food.nombre, tag, tipo: 'incompatibilidad' })
      }
    }
  }
  return conflicts
}

/** 'alergia' tiene prioridad sobre 'incompatibilidad'; sin conflictos es 'segura'. */
export function getDietStatus(conflicts) {
  if (conflicts.some((conflict) => conflict.tipo === 'alergia')) {
    return STATUS.ALERGIA
  }
  if (conflicts.some((conflict) => conflict.tipo === 'incompatibilidad')) {
    return STATUS.INCOMPATIBILIDAD
  }
  return STATUS.SEGURA
}

/** Ordena las entradas { diet, status } con las seguras primero (estable por nombre). */
export function sortEntriesBySafety(entries) {
  return [...entries].sort(
    (a, b) =>
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.diet.nombre.localeCompare(b.diet.nombre, 'es'),
  )
}

/** Qué exige el sistema antes de confirmar una asignación. */
export function getConfirmationRequirements(patient, status) {
  return {
    blocked: status === STATUS.ALERGIA,
    needsAcknowledgement: status === STATUS.INCOMPATIBILIDAD,
    needsJustification: status === STATUS.INCOMPATIBILIDAD,
    needsAllergyCheck: patient?.alergiasRegistradas === false,
  }
}

export const MIN_JUSTIFICATION_LENGTH = 10

/** Lista lo que falta para poder confirmar. Vacía = se puede confirmar. */
export function getMissingConfirmationSteps(requirements, { acknowledged, justification, allergyChecked }) {
  if (requirements.blocked) {
    return ['La dieta contiene un alimento al que el paciente es alérgico']
  }
  const missing = []
  if (requirements.needsAcknowledgement && !acknowledged) {
    missing.push('Marcar que revisó la alerta de incompatibilidad')
  }
  if (requirements.needsJustification && (justification ?? '').trim().length < MIN_JUSTIFICATION_LENGTH) {
    missing.push(`Escribir una justificación (mínimo ${MIN_JUSTIFICATION_LENGTH} caracteres)`)
  }
  if (requirements.needsAllergyCheck && !allergyChecked) {
    missing.push('Confirmar que verificó las alergias con el paciente')
  }
  return missing
}

export function calcImc(pesoKg, tallaM) {
  if (!pesoKg || !tallaM) {
    return null
  }
  return Math.round((pesoKg / (tallaM * tallaM)) * 10) / 10
}
