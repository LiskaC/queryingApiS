import { useState } from 'react'
import RestMethods from './views/RestMethods'
import PromisesVsAsync from './views/PromisesVsAsync'
import FetchVsAxios from './views/FetchVsAxios'
import Responses from './views/Responses'
import Demo from './views/InReact'
import './App.css'
import PublicApiTask from './views/PublicApiTask'
import YourTab from './views/YourTab'

type Tab =
  | 'rest-methods'
  | 'promises-vs-async'
  | 'fetch-vs-axios'
  | 'responses'
  | 'demo'
  | 'public-apis'
  | 'your-tab'

function App() {
  const [tab, setTab] = useState<Tab>('rest-methods')

  return (
    <>
      <nav className='tabs'>
        <button
          className={tab === 'rest-methods' ? 'tab active' : 'tab'}
          onClick={() => setTab('rest-methods')}
        >
          REST Methods
        </button>
        <button
          className={tab === 'responses' ? 'tab active' : 'tab'}
          onClick={() => setTab('responses')}
        >
          Responses
        </button>
        <button
          className={tab === 'promises-vs-async' ? 'tab active' : 'tab'}
          onClick={() => setTab('promises-vs-async')}
        >
          Promises vs Async/Await
        </button>
        <button
          className={tab === 'fetch-vs-axios' ? 'tab active' : 'tab'}
          onClick={() => setTab('fetch-vs-axios')}
        >
          Fetch vs Axios
        </button>
        <button className={tab === 'demo' ? 'tab active' : 'tab'} onClick={() => setTab('demo')}>
          In React
        </button>
        <button
          className={tab === 'public-apis' ? 'tab active' : 'tab'}
          onClick={() => setTab('public-apis')}
        >
          Public APIs
        </button>
        <button
          className={tab === 'your-tab' ? 'tab active' : 'tab'}
          onClick={() => setTab('your-tab')}
        >
          <b>YOUR TAB</b> ✏️
        </button>
      </nav>

      {tab === 'rest-methods' && (
        <section id='rest-methods-tab'>
          <h1>REST API Methods</h1>
          <RestMethods />
        </section>
      )}

      {tab === 'promises-vs-async' && (
        <section id='promises-vs-async-tab'>
          <h1>Promises vs Async/Await</h1>
          <PromisesVsAsync />
        </section>
      )}

      {tab === 'fetch-vs-axios' && (
        <section id='fva-tab'>
          <h1>Fetch vs Axios</h1>
          <FetchVsAxios />
        </section>
      )}

      {tab === 'responses' && (
        <section id='responses-tab'>
          <h1>Success vs Failure</h1>
          <Responses />
        </section>
      )}

      {tab === 'demo' && (
        <section id='demo-tab'>
          <h1>Demo</h1>
          <Demo />
        </section>
      )}

      {tab === 'public-apis' && (
        <section id='public-apis-tab'>
          <h1>Public APIs</h1>
          <PublicApiTask />
        </section>
      )}

      {tab === 'your-tab' && (
        <section id='your-tab'>
          <YourTab />
        </section>
      )}
    </>
  )
}

export default App
