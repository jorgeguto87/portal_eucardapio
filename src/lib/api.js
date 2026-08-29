import axios from 'axios'

// Em produção, aponta pro backend real. Em dev local, também — não faz
// sentido rodar o backend localmente só pra testar o site institucional.
const API_URL = import.meta.env.VITE_API_URL || 'https://servereucardapio.devaugusto.com.br/api'

const api = axios.create({ baseURL: API_URL })

export const PAINEL_URL = import.meta.env.VITE_PAINEL_URL || 'https://painel.eucardapio.com.br'

export const signup = async (payload) => {
  const { data } = await api.post('/signup', payload)
  return data.data
}

export default api
