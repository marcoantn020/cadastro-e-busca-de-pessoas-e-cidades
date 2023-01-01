import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'


interface IFerramentaDeDetalheProps {
  children?: React.ReactNode
  textoBotaoNovo?: string

  mostrarBotaoNovo?: boolean
  mostrarBotaoVoltar?: boolean
  mostrarBotaoApagar?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoSalvarEFechar?: boolean

  mostrarBotaoNovoCarregando?: boolean
  mostrarBotaoVoltarCarregando?: boolean
  mostrarBotaoApagarCarregando?: boolean
  mostrarBotaoSalvarCarregando?: boolean
  mostrarBotaoSalvarEFecharCarregando?: boolean

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

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmBotaoNovo,
  aoClicarEmBotaoVoltar,
  aoClicarEmBotaoApagar,
  aoClicarEmBotaoSalvar,
  aoClicarEmBotaoSalvarEFechar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
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

      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={aoClicarEmBotaoSalvar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar
          </Typography>
        </Button>)}
      {mostrarBotaoSalvarCarregando && (<Skeleton width={100} height={60} />)}


      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar e Voltar
          </Typography>
        </Button>)}
      {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (<Skeleton width={180} height={60} />)}


      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoApagar}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Apagar
          </Typography>
        </Button>)}
      {mostrarBotaoApagarCarregando && (<Skeleton width={100} height={60} />)}


      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoNovo}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {textoBotaoNovo}
          </Typography>
        </Button>)}
      {(mostrarBotaoNovoCarregando && !smDown) && (<Skeleton width={100} height={60} />)}

      {(mostrarBotaoVoltar &&
        (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)) && (
        <Divider variant='middle' orientation='vertical' />)}

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmBotaoVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Voltar
          </Typography>
        </Button>)}
      {mostrarBotaoVoltarCarregando && (<Skeleton width={100} height={60} />)}
      
    </Box>

  )
}