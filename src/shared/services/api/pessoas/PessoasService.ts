import { Environment } from '../../../environment'
import { Api } from '../axios-config'

export interface IListagemPessoa {
  id: number
  nomeCompleto: string
  email: string
  cidadeId: number
}

export interface IDetalhePessoa {
  id: number
  email: string
  cidadeId: number
  nomeCompleto: string
}

type TPessoaComTotalCount = {
  data: IListagemPessoa[]
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TPessoaComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
    const { data, headers } = await Api.get(urlRelativa)

    if(data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) || 0
      }
    }
    return new Error('Erro ao listar registros.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro ao listar registros.')
  }
}

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const urlRelativa = `/pessoas?id=${id}`
    const { data } = await Api.get(urlRelativa)

    if(data) return data
    
    return new Error('Erro ao consultar o registro.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro ao consultar o registro.')
  }
}

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados)

    if(data) return data.id
    
    return new Error('Erro ao criar o registro.')
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro ao criar o registro.')
  }
}

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro.')
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas?id=${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message || 'Erro ao apagar registro.')
  }
}


export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}