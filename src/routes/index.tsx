import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { 
  Dashboard, 
  ListagemDePessoas } from '../pages'
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
      <Route path='/pessoas' element={<ListagemDePessoas />} />

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  )
}