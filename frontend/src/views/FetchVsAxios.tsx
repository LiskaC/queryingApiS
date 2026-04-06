import { useEffect, useState } from 'react'

interface Comparison {
  label: string
  note: string
  fetch: string
  axios: string
}

export default function FetchVsAxios() {
  const [comparisons, setComparisons] = useState<Comparison[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/fetch-vs-axios')
      .then((res) => res.json())
      .then((data) => {
        setComparisons(data)
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
    <div className='fva-grid'>
      <div className='fva-intro'>
        <p>
          <strong>Fetch</strong> is a built-in browser API for making HTTP requests — no install
          needed, but fairly low-level.
        </p>
        <p>
          <strong>Axios</strong> is a third-party library that wraps Fetch with a cleaner API:
          automatic JSON parsing, better error handling, and extras like interceptors and timeouts
          out of the box.
        </p>
      </div>
      <div className='fva-header'>
        <span>Fetch API</span>
        <span>Axios</span>
      </div>
      {comparisons.map((c) => (
        <div key={c.label} className='fva-row'>
          <p className='fva-label'>{c.label}</p>
          <p className='fva-note'>{c.note}</p>
          <pre className='fva-code'>
            <code>{c.fetch}</code>
          </pre>
          <pre className='fva-code'>
            <code>{c.axios}</code>
          </pre>
        </div>
      ))}
    </div>
  )
}
