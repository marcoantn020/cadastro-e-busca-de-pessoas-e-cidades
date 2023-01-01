import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material'


interface IFerramentaDeDetalheProps {
  children?: React.ReactNode
  textoBotaoNovo?: string

  mostrarBotaoNovo?: boolean
  mostrarBotaoVoltar?: boolean
  mostrarBotaoApagar?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoSalvarEFechar?: boolean

  aoClicarEmBotaoNovo?: () => void
  aoClicarEmBotaoVoltar?: () => void
  aoClicarEmBotaoApagar?: () => void
  aoClicarEmBotaoSalvar?: () => void
  aoClicarEmBotaoSalvarEFechar?: () => void
}
export const FerramentaDeDetalhe: React.FC<IFerramentaDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmBotaoNovo,
  aoClicarEmBotaoVoltar,
  aoClicarEmBotaoApagar,
  aoClicarEmBotaoSalvar,
  aoClicarEmBotaoSalvarEFechar,
}) => {
  const theme = useTheme()

  return (

    <Box 
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >

      {mostrarBotaoSalvar && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={aoClicarEmBotaoSalvar}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>)}

      {mostrarBotaoSalvarEFechar && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >
          Salvar e Voltar
        </Button>)}

      {mostrarBotaoApagar && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoApagar}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>)}

      {mostrarBotaoNovo && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoNovo}
          startIcon={<Icon>add</Icon>}
        >
          {textoBotaoNovo}
        </Button>)}

      <Divider
        variant='middle'
        orientation='vertical'
      />

      {mostrarBotaoVoltar && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>)}
      
    </Box>

  )
}