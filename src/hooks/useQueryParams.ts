import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();
  
  const getDateParam = (): string => {
    const revue = searchParams.get('revue');
    if (!revue) {
      // Format de date YYYY-MM-DD
      return new Date().toISOString().split('T')[0];
    }
    // Nettoyer la valeur du paramètre (enlever les guillemets si présents)
    return revue.replace(/"/g, '');
  };

  return {
    getDateParam
  };
};
