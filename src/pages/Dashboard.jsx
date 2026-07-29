import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }
      setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary-900 px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Meridian Bank</h1>
        <button
          onClick={handleLogout}
          className="text-primary-200 hover:text-white text-sm font-medium"
        >
          Sign Out
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user?.user_metadata?.full_name || user?.email}
        </h2>
        <p className="text-gray-600 mb-8">
          Here's your account overview.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total Balance</p>
          <p className="text-3xl font-bold text-gray-900">$0.00</p>
          <p className="text-sm text-gray-400 mt-2">
            Account features coming soon
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
