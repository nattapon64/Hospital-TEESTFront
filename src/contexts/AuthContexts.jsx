import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const AuthContexts = createContext()

function AuthContextsProvider(props) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // console.log(user)

    useEffect ( ()=>{
        const run = async () => {
            try {
                setLoading(true)
                let token = localStorage.getItem('token')

                if(!token) {return}
                const rs = await axios.get('http://localhost:8000/auth/me', {
                    headers : { Authorization : `Bearer ${token}`}
                })

                // console.log(rs)

                setUser(rs.data)
                // console.log(rs.data)
            }catch(err) {
                console.log(err.message)
            }finally {
                setLoading(false)
            }
        }
        run()
    }, []);

    const logout = () => {
        Swal.fire({
            text: "Logout complete",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            width: '500px'
        }).then(() => {
            setUser(null);
            localStorage.removeItem("token");
        })

    };
  return (
    <AuthContexts.Provider value={{user, setUser, loading, logout, setLoading}}>
        {props.children}
    </AuthContexts.Provider>
  )
}

export { AuthContextsProvider }
export default AuthContexts