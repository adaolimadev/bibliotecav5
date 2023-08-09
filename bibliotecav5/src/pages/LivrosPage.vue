<template>
<q-page class="">
    <q-table
    dark
      class="q-ma-xl"
      padding
      title="LIVROS"
      :rows="livros"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top>
        <span class="text-h5">LIVROS</span>
        <q-space />
        <q-btn color="primary" icon="add" label="Novo Livro" :to="{ name: 'form-livro' }" />
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn round icon="edit " color="primary" @click="editLivro(props.row)"/>
          <q-btn round icon="delete" color="negative" @click="deleteLivro(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
</q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { livroStore } from './../stores/livros'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LivrosPage',
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const livros = ref([])
    const store = livroStore()

    onMounted(() => {
      getLivros()
    })

    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'titulo', field: 'titulo', label: 'Titulo', sortable: true, align: 'center' },
      { name: 'autor', field: 'autor', label: 'Autor', sortable: true, align: 'center' },
      { name: 'editora', field: 'editora', label: 'Editora', align: 'center' },
      { name: 'genero', field: 'genero', label: 'Gênero', align: 'center' },
      { name: 'ano', field: 'ano', label: 'Ano', align: 'center' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'center' }
    ]

    const getLivros = async () => {
      try {
        await store.BD_GET_LIVROS()
        livros.value = store.GET_LIVROS
      } catch (error) {
        console.log(error)
      }
    }

    const deleteLivro = async (id) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Deseja realmente excluir o livro de ID:  ${id} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await store.BD_DELETE_LIVRO(id)
          $q.notify({ message: 'Livro excluído com sucesso!', icon: 'check', color: 'positive' })
          await getLivros()
        })
      } catch (error) {
        console.log(error)
      }
    }

    const editLivro = async (livro) => {
      store.SET_LIVRO(livro)
      console.log(livro)
      router.push({ name: 'form-livro' })
    }

    return {
      livros,
      columns,
      deleteLivro,
      editLivro
    }
  }
})
</script>
