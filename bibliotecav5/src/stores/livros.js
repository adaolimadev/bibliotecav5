import { defineStore } from 'pinia'
import livroService from './../services/livros'

export const livroStore = defineStore('livros', {
  state: () => ({
    livros: {},
    livro: {
      id: '',
      titulo: '',
      autor: '',
      editora: '',
      genero: '',
      ano: ''
    }
  }),
  getters: {
    GET_LIVRO: (state) => state.livro,
    GET_LIVROS: (state) => state.livros
  },
  actions: {
    SET_LIVRO (livro) {
      this.livro = livro
    },

    async BD_GET_LIVROS () {
      try {
        const { list } = livroService()
        const response = await list()
        this.livros = response
      } catch (error) {
        console.log(error)
      }
    },
    async BD_ADD_LIVROS (livro) {
      try {
        const { post } = livroService()
        await post(livro)
      } catch (error) {
        console.log(error)
      }
    },

    async BD_DELETE_LIVRO (id) {
      try {
        const { remove } = livroService()
        await remove(id)
      } catch (error) {
        console.log(error)
      }
    },

    async BD_UPDATE_LIVRO (id) {
      console.log(id)
    }
  }
})
