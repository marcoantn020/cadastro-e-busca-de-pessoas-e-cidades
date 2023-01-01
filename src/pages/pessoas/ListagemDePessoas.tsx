import {  useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FerramentasDeListagem } from '../../shared/components'
import { useDebouce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService'


interface IListagemDePessoasProps {children?: React.ReactNode}
export const ListagemDePessoas: React.FC<IListagemDePessoasProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const debouce = useDebouce(3000)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  useEffect(() => {

    debouce.debounce(() => { 
      
      PessoasService.getAll(1, busca).then((result) => {
        if(result instanceof Error) {
          alert(result.message)
        } else {
          console.log(result)
        }
      })
    })

  }, [busca])


  return (
    <LayoutBaseDePagina 
      titulo='Listagem de pessoas'
      barraDeFerramentas={(
        <FerramentasDeListagem
          mostrarInputBusca
          textoDoBotaoNovo='Nova'
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      )}
    > 
      Testando
    </LayoutBaseDePagina>
  )
}