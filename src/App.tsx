import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from "./routes"
import { Toaster } from "@/components/ui/sonner"
import AgentOnboardingGate from "./routes/AgentOnboardingGate"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AgentOnboardingGate>
        <AppRoutes />
      </AgentOnboardingGate>
      <Toaster position="top-center" richColors />
    </Router>
  )
}

export default App
