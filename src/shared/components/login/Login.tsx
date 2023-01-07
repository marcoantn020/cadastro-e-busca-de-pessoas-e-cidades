import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../../contexts'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().min(4).required()
})


interface ILoginProps {children?: React.ReactNode}
export const Login: React.FC<ILoginProps> = ({children}) => {
  const { isAuthenticated, login } = useAuthContext()

  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const [emailError, setEmailError] = useState<string>()
  const [senhaError, setSenhaError] = useState<string>()

  const handleSubmit = () => {
    setIsLoading(true)
    loginSchema
      .validate({email, senha}, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.senha)
          .then(() => setIsLoading(false))
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false)
        errors.inner.forEach(error => {
          if(error.path == 'email') setEmailError(error.message)
          if(error.path == 'senha') setSenhaError(error.message)
        })
      })
  }


  if(isAuthenticated) return (<>{children}</>)

  return (
    <Box 
      width='100vw' 
      height='100vh' 
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={300}>
            <Typography variant='h6' align='center'>Identifique-se</Typography>

            <TextField
              fullWidth
              label='E-mail'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError('')}
            />

            <TextField
              fullWidth
              label='Senha'
              type='password'
              value={senha}
              disabled={isLoading}
              error={!!senhaError}
              helperText={senhaError}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={() => setSenhaError('')}
            />
          </Box>

        </CardContent>
        <CardActions>
          <Box 
            width='100%' 
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress size={18} variant='indeterminate' color='inherit' /> : undefined}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}