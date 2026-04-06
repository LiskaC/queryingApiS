import { useState } from 'react'

interface User {
  id: number
  name: string
  role: string
}

function ProfileCard({ user }: { user: User }) {
  return (
    <div className='demo-card'>
      <p className='demo-name'>{user.name}</p>
      <p className='demo-role'>{user.role}</p>
    </div>
  )
}

export default function Demo() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  async function loadUsers() {
    setLoading(true)
    const res = await fetch('http://localhost:3000/api/users')
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

  return (
    <div className='demo-page'>
      <ol>
        <li>Look at this fetch in `InReact.tsx`</li>
        <li>Look at fetching on mount `FetchVsAxios.tsx`</li>
      </ol>
      <div className='demo-live'>
        <button className='demo-btn' onClick={loadUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Load Users'}
        </button>
        {users.length > 0 && (
          <div className='demo-cards'>
            {users.map((user) => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
