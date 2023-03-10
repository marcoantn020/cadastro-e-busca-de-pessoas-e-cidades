import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FerramentaDeDetalhe } from '../../shared/components'
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService'
import * as yup from 'yup'
import { AutoCompleteCidade } from './components/AutoCompleteCidade'

interface IFormData {
  email: string
  cidadeId: number
  nomeCompleto: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().integer().required()
})

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')

  useEffect(() => {
    
    if(id !== 'nova') {
      setIsLoading(true)
      PessoasService.getById(Number(id))
        .then(result => {
          setIsLoading(false)
          if(result instanceof Error) {
            alert(result.message)
            navigate('/pessoas')
          } else {
            setNome(result.nomeCompleto)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        email: '',
        cidadeId: undefined,
        nomeCompleto: ''
      })
    }

  }, [id])

  const handleSave = (dados: IFormData) => {
    console.log(dados)
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true)
        if(id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then(result => {
              setIsLoading(false)
              if(result instanceof Error) {
                alert(result.message)
              } else {
                if(isSaveAndClose()) {
                  navigate('/pessoas')
                } else {
                  navigate(`/pessoas/detalhe/${result}`)
                }
              }
            })
        } else {
          PessoasService
            .updateById(Number(id), {id: Number(id),...dadosValidados})
            .then(result => {
              setIsLoading(false)
              if(result instanceof Error) {
                alert(result.message)
              } else {
                if(isSaveAndClose()) {
                  navigate('/pessoas')
                }
              }
            })
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if(!error.path) return
          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      })
  }

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso')
            navigate('/pessoas')
          }
        })
    }
  }
  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Criar nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentaDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmBotaoSalvar={save}
          aoClicarEmBotaoSalvarEFechar={saveAndClose}
          aoClicarEmBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmBotaoVoltar={() => navigate('/pessoas')}
          aoClicarEmBotaoApagar={() => handleDelete(Number(id))}
        />
      }
    >
      
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box 
          margin={1} 
          display="flex" 
          flexDirection="column" 
          component={Paper}
          variant="outlined"
        >

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6"> Geral </Typography>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                <VTextField
                  disabled={isLoading}
                  fullWidth 
                  label='Nome completo' 
                  name='nomeCompleto'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                <VTextField
                  disabled={isLoading}
                  fullWidth 
                  label='E-mail' 
                  name='email'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row'>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                <AutoCompleteCidade idExternalLoading={isLoading} />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>

    </LayoutBaseDePagina>
  )
}