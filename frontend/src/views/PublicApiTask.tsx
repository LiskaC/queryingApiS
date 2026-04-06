const featured = [
  {
    name: 'JSONPlaceholder',
    description: 'Fake API for practising CRUD (Create, Read, Update, Delete) Operations.',
    auth: false,
    example: 'GET https://jsonplaceholder.typicode.com/users',
    href: 'https://jsonplaceholder.typicode.com',
    tags: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  {
    name: 'PokeAPI',
    description: 'Pokémon names, stats, and images.',
    auth: false,
    example: 'GET https://pokeapi.co/api/v2/pokemon/pikachu',
    href: 'https://pokeapi.co',
    tags: ['GET'],
  },
  {
    name: 'REST Countries',
    description: 'Country info — flags, currencies, languages.',
    auth: false,
    example: 'GET https://restcountries.com/v3.1/all',
    href: 'https://restcountries.com',
    tags: ['GET'],
  },
  {
    name: 'JokeAPI',
    description: 'Random jokes by category.',
    auth: false,
    example: 'GET https://v2.jokeapi.dev/joke/Any',
    href: 'https://jokeapi.dev',
    tags: ['GET'],
  },
  {
    name: 'Cat Facts',
    description: 'Random cat facts.',
    auth: false,
    example: 'GET https://catfact.ninja/fact',
    href: 'https://catfact.ninja',
    tags: ['GET'],
  },
  {
    name: 'Bored API',
    description: 'Returns a random activity suggestion.',
    auth: false,
    example: 'GET https://www.boredapi.com/api/activity',
    href: 'https://www.boredapi.com',
    tags: ['GET'],
  },
]

const alsoCheckOut = [
  {
    name: 'OpenWeatherMap',
    href: 'https://openweathermap.org/api',
    note: 'Real weather data — free tier, API key required',
  },
  {
    name: 'CoinGecko',
    href: 'https://www.coingecko.com/en/api',
    note: 'Crypto prices and charts — free, no key',
  },
  { name: 'Open-Meteo', href: 'https://open-meteo.com', note: 'Weather forecasts — free, no key' },
  { name: 'NASA APIs', href: 'https://api.nasa.gov', note: 'Space images and data — free API key' },
  {
    name: 'Hugging Face Inference API',
    href: 'https://huggingface.co/docs/api-inference',
    note: 'Call AI/ML models — free tier',
  },
]

export default function PublicApiTask() {
  return (
    <div className='task-page'>
      <p className='task-intro'>
        Use one or more APIs below to fetch and display data in your own React app.
        <br />
        Do this either:
        <ul>
          <li>"On Click" as in `InReact.tsx`</li>
          <li>"On Mount/Load" as in `FetchVsAxios.tsx`</li>
        </ul>
        Work in the "YOUR TAB" component.
      </p>

      <div className='task-api-list'>
        {featured.map((api) => (
          <div key={api.name} className='task-api-card'>
            <div className='task-api-header'>
              <a
                className='task-api-name'
                href={api.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                {api.name} ↗
              </a>
              <span className={`task-auth ${api.auth ? 'needs-key' : 'no-key'}`}>
                {api.auth ? 'API key required' : 'No auth'}
              </span>
              <div className='task-api-tags'>
                {api.tags.map((t) => (
                  <span key={t} className={`method-badge method-${t.toLowerCase()}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className='task-api-desc'>{api.description}</p>
            <code className='task-api-example'>{api.example}</code>
          </div>
        ))}
      </div>

      <div className='task-also'>
        <p className='task-also-label'>Also worth checking out</p>
        <ul className='task-also-list'>
          {alsoCheckOut.map((api) => (
            <li key={api.name}>
              <a href={api.href} target='_blank' rel='noopener noreferrer'>
                {api.name} ↗
              </a>
              <span className='task-also-note'>{api.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
