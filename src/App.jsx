import EditorInterface from "./components/editor"
import Signup from "./components/auth"
import { Routes,Route,Link } from "react-router"

function App() {
  return (
        <>
        <Signup/>
        {/* <Routes>
            <Route path="signup" element={<Signup/>}/>
            <Route path="editor" element={<EditorInterface/>} />
        </Routes> */}
            
        </>
    )
}

export default App
