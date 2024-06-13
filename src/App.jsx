import React from "react";
import WebRouters from "./Routers/WebRouters";

function App() {

  const { loading } = useAuth();
  
  if(loading){
    return(
      <div className="w-full h-screen flex justify-center items-center text-3xl">
        <p>กำลังโหลด</p>
      </div>
    )
  }
  return (
    <div>
      <WebRouters/>
    </div>
  )
}
import useAuth from "./hooks/useAuth";

export default App