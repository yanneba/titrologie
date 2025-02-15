import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { format } from 'date-fns-tz'
import { fr } from 'date-fns/locale'
import { motion } from 'framer-motion';
import NewsGrid from "./components/NewsGrid";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  color: #004A8F;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  margin-top: auto;

  a {
    color: #FF6600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

function App() {
  const today = format(new Date(), 'PPP', { locale: fr })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <Container>
            <Header />
            <NewsGrid />
            <Footer>
              &copy; 2025 EBA Yann - <a href="mailto:yanneba@cie.ci">yanneba@cie.ci</a>
            </Footer>
          </Container>
        </AppContainer>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
