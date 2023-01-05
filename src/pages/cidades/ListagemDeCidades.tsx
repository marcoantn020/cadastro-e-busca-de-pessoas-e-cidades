import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'

import { FerramentasDeListagem } from '../../shared/components'
import { useDebouce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { Environment } from '../../shared/environment'
import { CidadesService, IListagemCidade } from '../../shared/services/api/cidades/CidadeService'


export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const debouce = useDebouce()
  const navigate = useNavigate()

  const [rows, setRows] = useState<IListagemCidade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1')
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)

    debouce.debounce(() => { 
      
      CidadesService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false)

          if(result instanceof Error) {
            alert(result.message)
          } else {
            console.log(result)
            setRows(result.data)
            setTotalCount(result.totalCount)
          }
        })
    })

  }, [busca, pagina])

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message)
          } else {
            setRows(oldRows => {
              return [...oldRows.filter(oldRow => oldRow.id !== id)]
            })
            alert('Registro apagado com sucesso')
          }
        })
    }
  }


  return (
    <LayoutBaseDePagina 
      titulo='Listagem de cidades'
      barraDeFerramentas={(
        <FerramentasDeListagem
          mostrarInputBusca
          textoDoBotaoNovo='Nova'
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      )}
    > 

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows?.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell> {row.nome} </TableCell>
              </TableRow>
            ))}

          </TableBody>
          {totalCount === 0 && !isLoading && (<caption>{Environment.LISTAGEM_VAZIA}</caption>)}
          <TableFooter>

            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
            
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  )
}