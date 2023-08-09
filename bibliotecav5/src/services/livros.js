import useApi from './../composables/UseApi'

export default function livroService () {
  const { list, post, update, remove, getById } = useApi('/livros')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
