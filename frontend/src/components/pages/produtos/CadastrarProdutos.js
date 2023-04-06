import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Componentes
import Input from '../../form/Input'

// utils
import api from '../../../utils/api'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'


function CadastrarProdutos() {
  const [produto, setProduto] = useState({})
  const [token] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  // Usar as mensagens
  const {setFlashMessage} = useFlashMessage()

  function handleChange(e) {
    setProduto({...produto, [e.target.name]: e.target.value})
  }

  // Função para cadastrar o produto
  async function handleSubmit(e){
    e.preventDefault()
    let msgType = 'sucess'

    try {
            const response = await api.post(`/produtos/cadastrar/`, produto, {
                // Mandar o token para o headers
                headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
        setFlashMessage(response.data.message, msgType)
        } catch (error) {
        setFlashMessage(error.response.data.message || error.message, 'error')
        }

  }

  return (
              <form onSubmit={handleSubmit}>
                <Input
                text="Produto: "
                type="text"
                name="nome"
                placeholder="Digite o nome do produto"
                handleOnChange={handleChange}
                />
                <Input
                text="Descrição: "
                type="text"
                name="descricao"
                placeholder="Digite a descrição do produto"
                handleOnChange={handleChange}
                />
                <Input
                text="Valor: "
                type="number"
                name="valor"
                placeholder="Digite o valor do produto"
                handleOnChange={handleChange}
                />
                <button type="submit">Cadastrar produto</button>
              </form>
  )
}

export default CadastrarProdutos