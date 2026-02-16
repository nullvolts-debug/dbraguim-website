import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Contato from "@/pages/Contato";
import Portfolio from "@/pages/Portfolio";
import Sobre from "@/pages/Sobre";
import KnifePage from "@/pages/KnifePage";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";

// Router Component: Gerencia as rotas da aplicação
function Router() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/faca/:slug"} component={KnifePage} />
        <Route path={"/portfolio"} component={Portfolio} />
        <Route path={"/sobre"} component={Sobre} />
        <Route path={"/contato"} component={Contato} />
        {/* Rota 404 explícita e catch-all para erros */}
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

// App Component Principal
// Estrutura de Providers (Contextos)
// A ordem importa! Os componentes que injetam CSS/Estilos devem ficar
// o mais "profundo" ou "tarde" possível para não poluir o <head> antes do SEO.

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            {/* 
              🚨 MUDANÇA ESTRATÉGICA DE POSIÇÃO:
              O <Router /> contém o <SEO /> (via páginas). Ele deve ser renderizado PRIMEIRO.
              Isso aumenta a chance das meta tags entrarem no <head> antes de qualquer estilo global.
            */}
            <Router />
            
            {/* 
              O <Toaster /> injeta um bloco gigante de CSS no <head>.
              Colocando-o DEPOIS do Router, tentamos garantir que o CSS fique 
              DEPOIS das meta tags, permitindo que o WhatsApp leia o SEO corretamente.
            */}
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;