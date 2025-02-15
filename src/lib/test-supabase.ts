import { supabase } from './supabase'

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('article')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Erreur de connexion à Supabase:', error.message)
      return
    }

    console.log('Connexion à Supabase réussie!')
    console.log('Premier article:', data)
  } catch (err) {
    console.error('Erreur inattendue:', err)
  }
}

testConnection()
