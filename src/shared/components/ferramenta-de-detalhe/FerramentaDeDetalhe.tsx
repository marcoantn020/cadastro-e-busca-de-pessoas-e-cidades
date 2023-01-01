import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material'


interface IFerramentaDeDetalheProps {children?: React.ReactNode}
export const FerramentaDeDetalhe: React.FC<IFerramentaDeDetalheProps> = () => {
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

      <Button
        color='primary'
        disableElevation
        variant='contained'
        // onClick={() => void}
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>

      <Button
        color='primary'
        disableElevation
        variant='outlined'
        // onClick={() => void}
        startIcon={<Icon>save</Icon>}
      >
        Salvar e Voltar
      </Button>

      <Button
        color='primary'
        disableElevation
        variant='outlined'
        // onClick={() => void}
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>

      <Button
        color='primary'
        disableElevation
        variant='outlined'
        // onClick={() => void}
        startIcon={<Icon>add</Icon>}
      >
        Novo
      </Button>

      <Divider
        variant='middle'
        orientation='vertical'
      />

      <Button
        color='primary'
        disableElevation
        variant='outlined'
        // onClick={() => void}
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
      
    </Box>

  )
}