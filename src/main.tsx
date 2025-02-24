import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from "./router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />  {/* ✅ This is where AppRouter (and all pages) are rendered */}
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
