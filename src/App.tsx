import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "@emotion/styled";
import NewsGrid from "./components/NewsGrid";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  color: #666;
  font-size: 0.9rem;
  
  a {
    color: #666;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function App() {
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
  );
}

export default App;
