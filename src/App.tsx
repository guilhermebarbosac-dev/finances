import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { LoginForm } from "./components/auth/LoginForm";
import { AuthProvider, useAuth } from "./components/auth/AuthProvider";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

function UnauthenticatedApp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}

function AppContent() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return session ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function App() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
