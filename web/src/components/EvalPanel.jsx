import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PrimaryButton, SecondaryButton } from './ui.js'

const Panel = styled.aside`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 20;
  width: min(300px, calc(100% - 2rem));
  background: #0f172a;
  color: #f8fafc;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.35);

  h2 {
    margin: 0 0 0.4rem;
    font-size: 0.95rem;
  }

  p {
    margin: 0.2rem 0;
    font-size: 0.88rem;
  }

  button {
    margin-top: 0.6rem;
  }
`

const formatSeconds = (ms) => `${(ms / 1000).toFixed(1)} s`

/**
 * Modo evaluación (solo con ?eval=1): cronometra la tarea de la prueba con usuarios (CA4).
 * Se detiene cuando se registra una nueva asignación.
 */
export default function EvalPanel({ assignments }) {
  const [run, setRun] = useState(null) // { startedAt, baseCount }
  const [now, setNow] = useState(() => Date.now())
  const [copied, setCopied] = useState(false)

  const finished = run ? assignments[run.baseCount] : undefined

  useEffect(() => {
    if (!run || finished) {
      return undefined
    }
    const timer = setInterval(() => setNow(Date.now()), 200)
    return () => clearInterval(timer)
  }, [run, finished])

  const elapsed = run ? (finished ? finished.ts : now) - run.startedAt : 0
  const result = finished
    ? {
        tiempoSegundos: Number((elapsed / 1000).toFixed(1)),
        menosDe90s: elapsed < 90000,
        dietaSegura: finished.estado === 'segura',
        estadoDieta: finished.estado,
        alertasMostradas: finished.alertasMostradas.length,
        alertaReconocida: finished.alertaReconocida,
        paciente: finished.patient,
        dieta: finished.diet,
      }
    : null

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Panel aria-label="Modo evaluación">
      <h2>Modo evaluación</h2>
      <p>Tarea: asignar una dieta segura a Ana García para su obesidad.</p>
      {!run && (
        <PrimaryButton type="button" onClick={() => setRun({ startedAt: Date.now(), baseCount: assignments.length })}>
          Iniciar tarea
        </PrimaryButton>
      )}
      {run && (
        <p aria-live="off">
          <strong>Tiempo: {formatSeconds(elapsed)}</strong>
        </p>
      )}
      {result && (
        <>
          <p>{result.menosDe90s ? 'Dentro de 90 s' : 'Superó 90 s'} · dieta {result.estadoDieta}</p>
          <p>
            Alertas mostradas: {result.alertasMostradas} · reconocida: {result.alertaReconocida ? 'sí' : 'no'}
          </p>
          <SecondaryButton type="button" onClick={copyResult}>
            {copied ? 'Copiado' : 'Copiar resultado (JSON)'}
          </SecondaryButton>{' '}
          <SecondaryButton type="button" onClick={() => setRun(null)}>
            Reiniciar
          </SecondaryButton>
        </>
      )}
    </Panel>
  )
}
