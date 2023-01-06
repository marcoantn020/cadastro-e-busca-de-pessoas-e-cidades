import { Api } from '../axios-config'

interface IAuth {
  accesToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get('/auth', {data: {email, password}})

    if(data) return data.accesToken
   
    return new Error('Error ao logar')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Error ao logar')
  }

}

export const AuthService = {
  auth
}