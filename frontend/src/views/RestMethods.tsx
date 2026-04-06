import { useEffect, useState } from 'react'

interface RestMethod {
  method: string
  description: string
  template: string
  safe: boolean
  idempotent: boolean
  example: string
  body: string | null
  response: { status: number; body: string | null }
}

export default function RestMethods() {
  const [methods, setMethods] = useState<RestMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/rest-methods')
      .then((res) => res.json())
      .then((data) => {
        setMethods(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch. Is the backend running?')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  if (error) return <p className='error'>{error}</p>

  return (
    <div className='rest-methods'>
      <p>
        These methods map to <strong>CRUD</strong> operations — <strong>C</strong>reate (POST),{' '}
        <strong>R</strong>ead (GET), <strong>U</strong>pdate (PUT / PATCH), <strong>D</strong>elete
        (DELETE) — the four basic actions you perform on data.
      </p>
      <ol>
        <li>
          Explore how this raw data looks: <code>http://localhost:3000/api/rest-methods</code>
        </li>
      </ol>
      {methods.map((m) => (
        <div key={m.method} className='method-card'>
          <span className={`method-badge method-${m.method.toLowerCase()}`}>{m.method}</span>
          <div className='method-info'>
            <p className='method-description'>{m.description}</p>
            <p className='method-description'>
              Template: <code className='method-template'>{m.template}</code>
            </p>
            <p className='method-description'>
              Example: <code className='method-example'>{m.example}</code>
            </p>
            <p className='method-description'>
              Body:{' '}
              {m.body ? (
                <code className='method-body'>{m.body}</code>
              ) : (
                <span className='method-nobody'>none</span>
              )}
            </p>
            <details className='method-response'>
              <summary>Example response</summary>
              <div className='method-response-body'>
                <span className={`method-status status-${Math.floor(m.response.status / 100)}xx`}>
                  {m.response.status}
                </span>
                {m.response.body ? (
                  <code>{m.response.body}</code>
                ) : (
                  <span className='method-nobody'>no body</span>
                )}
              </div>
            </details>
            <div className='method-tags'>
              <span className={m.safe ? 'tag yes' : 'tag no'}>Safe: {m.safe ? 'Yes' : 'No'}</span>
              <span className={m.idempotent ? 'tag yes' : 'tag no'}>
                Idempotent: {m.idempotent ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
