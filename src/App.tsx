import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from "./routes"
import { Toaster } from "@/components/ui/sonner"
import AgentOnboardingGate from "./routes/AgentOnboardingGate"

function App() {
  return (
    <Router>
      <AgentOnboardingGate>
        <AppRoutes />
      </AgentOnboardingGate>
      <Toaster position="top-center" richColors />
    </Router>
  )
}

export default App
