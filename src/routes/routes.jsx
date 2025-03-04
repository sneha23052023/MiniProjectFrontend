import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import EditorInterface from "../components/editor";
import AuthComponent from "../components/auth";

function RoutedApp() {
  return (
        <Router>
        <Routes>
        <Route path="/" element={<Navigate to={'/editor'} />} />
        <Route path="/auth" element={<AuthComponent />} />
        <Route 
            path="/editor" 
            element={
            <PrivateRoute>
                <EditorInterface />
            </PrivateRoute>
            } 
        />
        </Routes>
        </Router>
    );
}
export default RoutedApp;