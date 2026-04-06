import { useState } from 'react'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className='fva-code'>
      <code>{code}</code>
    </pre>
  )
}

function GetExample() {
  function run() {
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const thenCode = `fetch('http://localhost:3000/api/users')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err))`

  const awaitCode = `const res = await fetch('http://localhost:3000/api/users')
const data = await res.json()
console.log(data)`

  return (
    <div className='lf-example'>
      <div className='lf-example-header'>
        <span className='method-badge method-get'>GET</span>
        <code className='lf-url'>/api/users</code>
        <button className='lf-run' onClick={run}>
          Run
        </button>
      </div>

      <p className='lf-syntax-label'>then / catch</p>
      <a
        href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise'
        target='_blank'
        rel='noopener noreferrer'
      >
        "Promises" documentation
      </a>
      <CodeBlock code={thenCode} />

      <p className='lf-syntax-label lf-syntax-compare'>same thing with async / await</p>
      <a
        href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function'
        target='_blank'
        rel='noopener noreferrer'
      >
        "Async functions" documentation
      </a>
      <CodeBlock code={awaitCode} />
    </div>
  )
}

function PostExample() {
  const [name, setName] = useState('Marie Curie')
  const [role, setRole] = useState('researcher')

  function run() {
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  const thenCode = `fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '${name}', role: '${role}' }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err))`

  const awaitCode = `const res = await fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '${name}', role: '${role}' }),
})
const data = await res.json()
console.log(data)`

  return (
    <div className='lf-example'>
      <div className='lf-example-header'>
        <span className='method-badge method-post'>POST</span>
        <code className='lf-url'>/api/users</code>
        <button className='lf-run' onClick={run}>
          Run
        </button>
      </div>

      <div className='lf-inputs'>
        <label>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          role
          <input value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
      </div>

      <p className='lf-syntax-label'>then / catch</p>
      <CodeBlock code={thenCode} />

      <p className='lf-syntax-label lf-syntax-compare'>same thing with async / await</p>
      <CodeBlock code={awaitCode} />
    </div>
  )
}

export default function PromisesVsAsync() {
  return (
    <div className='lf-page'>
      <p className='lf-intro'>
        Both "Promises" using `.then ... .catch` syntax, and the `async`/`await` syntax, allow us to
        make API calls and handle the delay which fetching data creates. This is a style choice, but
        'async/await' is the more modern approach.
      </p>
      <ol>
        <li>Compare the syntaxes</li>
        <li>Check out the calls in the console</li>
      </ol>
      <GetExample />
      <PostExample />
    </div>
  )
}
