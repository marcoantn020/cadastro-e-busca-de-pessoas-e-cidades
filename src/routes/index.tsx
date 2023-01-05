import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { 
  Dashboard, 
  ListagemDePessoas, 
  DetalheDePessoas, 
  ListagemDeCidades,
  DetalheDeCidade} from '../pages'
import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página inicial',
        path: '/pagina-inicial',
        icon: 'home'
      },
      {
        label: 'Pessoas',
        path: '/pessoas',
        icon: 'people'
      },
      {
        label: 'Cidades',
        path: '/cidades',
        icon: 'location_city'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      {/* Pessoas */}
      <Route path='/pessoas' element={<ListagemDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />
      {/* Cidades */}
      <Route path='/cidades' element={<ListagemDeCidades />} />
      <Route path='/cidades/detalhe/:id' element={<DetalheDeCidade />} />

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  )
}