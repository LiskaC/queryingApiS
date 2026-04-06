import { useState } from 'react'

interface ResponseSnapshot {
  status: number
  statusText: string
  headers: Record<string, string>
  body: unknown
}

type PanelState = 'idle' | 'loading' | 'done' | 'network-error'

function ResponsePanel({
  title,
  url,
  state,
  snapshot,
  onRun,
}: {
  title: string
  url: string
  state: PanelState
  snapshot: ResponseSnapshot | null
  onRun: () => void
}) {
  const isSuccess = snapshot && snapshot.status >= 200 && snapshot.status < 300

  return (
    <div className={`resp-panel ${snapshot ? (isSuccess ? 'resp-success' : 'resp-failure') : ''}`}>
      <div className='resp-panel-header'>
        <p className='resp-panel-title'>{title}</p>
        <code className='lf-url'>{url}</code>
        <button className='lf-run' onClick={onRun}>
          Run
        </button>
      </div>

      {state === 'idle' && <p className='resp-hint'>Hit Run to see the response.</p>}
      {state === 'loading' && <p className='resp-hint'>Loading...</p>}
      {state === 'network-error' && (
        <p className='resp-hint error'>Network error — is the backend running?</p>
      )}

      {state === 'done' && snapshot && (
        <div className='resp-details'>
          <div className='resp-row'>
            <span className='resp-key'>Status</span>
            <span className={`method-status status-${Math.floor(snapshot.status / 100)}xx`}>
              {snapshot.status}
            </span>
            <span className='resp-status-text'>{snapshot.statusText}</span>
          </div>
          <div className='resp-row'>
            <span className='resp-key'>Content-Type</span>
            <code className='resp-value'>{snapshot.headers['content-type'] ?? '—'}</code>
          </div>
          <div className='resp-row resp-body-row'>
            <span className='resp-key'>Body</span>
            <pre className='resp-body'>
              <code>{JSON.stringify(snapshot.body, null, 2)}</code>
            </pre>
          </div>
          <p className='resp-object-label'>Full response object</p>
          <pre className='resp-body resp-object'>
            <code>{formatResponseObject(snapshot)}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

function formatResponseObject(snap: ResponseSnapshot): string {
  const headersLines = Object.entries(snap.headers)
    .map(([k, v]) => `    "${k}": "${v}"`)
    .join(',\n')
  const bodyStr = JSON.stringify(snap.body, null, 2)
    .split('\n')
    .map((l, i) => (i === 0 ? l : '    ' + l))
    .join('\n')
  return `Response {
  status: ${snap.status},
  statusText: "${snap.statusText}",
  ok: ${snap.status >= 200 && snap.status < 300},
  headers: {
${headersLines}
  },
  body: ${bodyStr}
}`
}

async function doFetch(url: string): Promise<ResponseSnapshot> {
  const res = await fetch(url)
  const headers: Record<string, string> = {}
  res.headers.forEach((v, k) => {
    headers[k] = v
  })
  const body = await res.json()
  return { status: res.status, statusText: res.statusText, headers, body }
}

export default function Responses() {
  const [successState, setSuccessState] = useState<PanelState>('idle')
  const [successSnap, setSuccessSnap] = useState<ResponseSnapshot | null>(null)
  const [failState, setFailState] = useState<PanelState>('idle')
  const [failSnap, setFailSnap] = useState<ResponseSnapshot | null>(null)

  function runSuccess() {
    setSuccessState('loading')
    doFetch('http://localhost:3000/api/users/1')
      .then((snap) => {
        setSuccessSnap(snap)
        setSuccessState('done')
      })
      .catch(() => setSuccessState('network-error'))
  }

  function runFailure() {
    setFailState('loading')
    doFetch('http://localhost:3000/api/users/999')
      .then((snap) => {
        setFailSnap(snap)
        setFailState('done')
      })
      .catch(() => setFailState('network-error'))
  }

  return (
    <div className='resp-page'>
      <p className='lf-intro'>
        Both requests hit the same endpoint — one with a valid ID, one that doesn't exist. Compare
        what comes back.
      </p>
      <ol className='lf-intro'>
        <li>Check the response via the UI</li>
        <li>Check the response via the Network Tab</li>
        <li>Check the response via the URL</li>
      </ol>
      <div className='resp-grid'>
        <ResponsePanel
          title='Success'
          url='/api/users/1'
          state={successState}
          snapshot={successSnap}
          onRun={runSuccess}
        />
        <ResponsePanel
          title='Failure'
          url='/api/users/999'
          state={failState}
          snapshot={failSnap}
          onRun={runFailure}
        />
      </div>
      <p className='resp-conclusion'>
        What statuses can you get? Visit{' '}
        <a href='https://http.cat/' target='_blank' rel='noopener noreferrer'>
          HTTP Cat
        </a>
      </p>
    </div>
  )
}
