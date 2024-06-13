import { useContext } from 'react'
import AuthContexts from '../contexts/AuthContexts'

function useAuth() {
  return useContext(AuthContexts)
}

export default useAuth