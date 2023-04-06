import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

// utils
import api from '../../../utils/api'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyProdutos() {
    const [produtos, setProdutos] = useState([])
    const [token] = useState(localStorage.getItem('token'))

    // Usar as mensagens
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
      api.get('/produtos/MeusProdutosCadastrados', {
        // Mandar o token para o headers
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
          }
      }).then((response) => {
        console.log(response.data)
        setProdutos(response.data)
      })
    }, [token])


  return (
    <section>
        <h1>Meus Produtos</h1>
        <Link to= '/produtos/cadastrar'>Cadastrar produto</Link>
      
            {produtos.length > 0 &&
              produtos.map((produto) => (
                  <div key={produto._id}>
                    <p>Nome: {produto.nome}</p>
                    <p>Descrição: {produto.descricao}</p>
                    <p>Valor: {produto.valor}</p>
                    <div>
                    {produto.available ? (

                    <p>Produto disponível</p>
                    ) : (
                    <p>Produto já comprado</p>
                    )}
                    </div><br></br>
                  </div>
                )
              )
            }
            {produtos.length === 0 && <p>Não há produtos cadastrados</p>}
    </section>
    
  )
}

export default MyProdutos