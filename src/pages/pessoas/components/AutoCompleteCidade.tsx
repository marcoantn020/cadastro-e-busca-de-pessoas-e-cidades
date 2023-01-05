import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useMemo, useState } from 'react'
import { useDebouce } from '../../../shared/hooks'
import { CidadesService } from '../../../shared/services/api/cidades/CidadeService'

type TAutoCompleteOption = {
  id:number
  label: string
}

interface IAutoCompleteCidadeProps {
  idExternalLoading?: boolean
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ idExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId')
  const [options, setOptions] = useState<TAutoCompleteOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [busca, setBusca] = useState('')

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)

  const {debounce} = useDebouce()

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    })
  }, [registerField, fieldName, selectedId])

  useEffect(() => {
    setIsLoading(true)

    debounce(() => { 
      
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false)

          if(result instanceof Error) {
            // alert(result.message)
          } else {
            console.log(result)
            setOptions(result.data.map(data => ({id: data.id, label: data.nome})))
          }
        })
    })
  }, [busca])

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null

    const selectedOption = options.find(op => op.id === selectedId)
    if(!selectedOption) return null

    return selectedOption
  },[selectedId, options])

  return (
    <Autocomplete
      disablePortal
      options={options}
      openText='Abrir'
      closeText='Fechar'
      loading={isLoading}
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disabled={idExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {setSelectedId(newValue?.id); setBusca(''); clearError()}}
      popupIcon={(idExternalLoading || isLoading) ? <CircularProgress size={25} /> : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  )
}