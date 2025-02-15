import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useQueryParams } from '../hooks/useQueryParams'
import { format } from 'date-fns-tz'
import { fr } from 'date-fns/locale'

const HeaderContainer = styled.header`
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #003366 0%, #004A8F 100%);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid #FF6600;
`

const Title = styled(motion.h1)`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  span {
    color: #FF6600;
  }
`

const DateText = styled.p`
  color: #FFA366;
  margin: 0;
  text-align: center;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
`

const Header = () => {
  const { getDateParam } = useQueryParams();
  const selectedDate = getDateParam();
  
  const formattedDate = format(new Date(selectedDate), 'PPP', { locale: fr });

  return (
    <HeaderContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Titrologie - <span>Revue de presse</span>
      </Title>
      <DateText>{formattedDate}</DateText>
    </HeaderContainer> 
  )
}

export default Header
