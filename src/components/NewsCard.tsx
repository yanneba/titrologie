import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Card = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
`

const Content = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #1a1a1a;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
`

const DateText = styled.time`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`

interface Article {
  id: number
  date: string
  categorie: string
  titre: string
  image?: string
}

interface NewsCardProps {
  article: Article
}

const NewsCard = ({ article }: NewsCardProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {article.image && (
        <ImageContainer>
          <Image 
            src={article.image} 
            alt={article.titre}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder-news.jpg';
            }}
          />
        </ImageContainer>
      )}
      <Content>
        <Title>{article.titre}</Title>
        <DateText>{formattedDate}</DateText>
      </Content>
    </Card>
  )
}

export default NewsCard
