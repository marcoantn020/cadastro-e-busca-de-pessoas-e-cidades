import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { FerramentasDeListagem } from '../../shared/components'
import { useDebouce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService'


interface IListagemDePessoasProps {children?: React.ReactNode}
export const ListagemDePessoas: React.FC<IListagemDePessoasProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const debouce = useDebouce()

  const [rows, setRows] = useState<IListagemPessoa[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)

    debouce.debounce(() => { 
      
      PessoasService.getAll(1, busca)
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

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows?.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell> {row.nomeCompleto} </TableCell>
                <TableCell> {row.email} </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  )
}