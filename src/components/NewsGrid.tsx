import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import NewsCard from './NewsCard'
import { motion } from 'framer-motion'
import { useQueryParams } from '../hooks/useQueryParams'

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const CategorySection = styled.section`
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #f6f8fc 0%, #ffffff 100%);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`

const CategoryTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: #1a73e8;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #1a73e8, #64b5f6);
    border-radius: 2px;
  }
`

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`

const QuotidiensHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const NoArticlesMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`

interface Article {
  id: number
  date: string
  categorie: string
  titre: string
  image?: string
}

const NewsGrid = () => {
  const { getDateParam } = useQueryParams();
  const selectedDate = getDateParam();

  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ['articles', selectedDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('article')
        .select('*')
        .eq('date', selectedDate)
        .order('categorie', { ascending: true })
      
      if (error) throw error
      return data || []
    }
  })

  if (isLoading) {
    return <LoadingContainer>Chargement des articles...</LoadingContainer>
  }

  if (error) {
    return <div>Erreur: {(error as Error).message}</div>
  }

  if (!articles || articles.length === 0) {
    return (
      <NoArticlesMessage>
        Aucun article trouvé pour la date du {new Date(selectedDate).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </NoArticlesMessage>
    )
  }

  const articlesByCategory = articles.reduce((acc, article) => {
    const category = article.categorie || 'Non catégorisé'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(article)
    return acc
  }, {} as Record<string, Article[]>)

  // Ordre spécifique des catégories
  const categoryOrder = ["QUOTIDIENS", "HEBDOMADAIRES", "MAGAZINES & MENSUELS"];
  
  // Trier les catégories selon l'ordre spécifié
  const sortedCategories = Object.entries(articlesByCategory).sort(([a], [b]) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    // Si une catégorie n'est pas dans l'ordre spécifié, la mettre à la fin
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sortedCategories.map(([category, categoryArticles]) => (
        <CategorySection key={category}>
          <QuotidiensHeader>
            <CategoryTitle>
              {category}
            </CategoryTitle>
          </QuotidiensHeader>
          <Grid>
            {categoryArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </Grid>
        </CategorySection>
      ))}
    </motion.div>
  )
}

export default NewsGrid
