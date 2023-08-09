<template>
    <q-page padding>
        <div style="max-width: 500px">
          <h3 class="q-ml-lg">{{title}} LIVRO</h3>
            <q-form
            @submit="onSubmit"
            class="flex-column"
            ref="formLivro"
            >
                <q-input
                class="q-mb-md"
                outlined
                v-model="form.titulo"
                label="Título"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
                >
                </q-input>
                <q-input
                class="q-mb-md"
                outlined
                v-model="form.autor"
                label="Autor"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
                >

                </q-input>
                <q-input
                class="q-mb-md"
                outlined
                v-model="form.editora"
                label="Editora"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
                >

                </q-input>
                <q-input
                class="q-mb-md"
                outlined
                v-model="form.genero"
                label="Genero"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
                >
                </q-input>

                <q-input
                class="q-mb-md"
                outlined
                v-model="form.ano"
                label="Ano"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
                >
                </q-input>

                <div class="q-gutter-xl on-right">
                  <q-btn label="Cancelar" color="negative" icon="close" :to="{ name: 'livros' }" ></q-btn>
                  <q-btn large :label="title" color="primary"  icon="save" type="submit"></q-btn>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { livroStore } from './../stores/livros'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'FormLivro',
  setup () {
    const $q = useQuasar()
    const store = livroStore()
    const router = useRouter()
    const form = ref({
      titulo: '',
      autor: '',
      editora: '',
      genero: '',
      ano: ''
    })
    const formLivro = ref(null)
    const title = computed(() => {
      if (store.GET_LIVRO.id) {
        return 'EDITAR'
      } else {
        return 'INSERIR'
      }
    })

    onMounted(async () => {
      if (store.GET_LIVRO.id) {
        form.value = store.GET_LIVRO
      }
    })

    onBeforeUnmount(() => {
      store.SET_LIVRO({})
    })

    const onSubmit = async () => {
      if (!formLivro.value.validate()) {
        $q.notify({ message: 'Atenção! Preencha todos os campos!', icon: 'danger', color: 'negative' })
        return false
      }
      try {
        if (store.GET_LIVRO.id) {
          await store.BD_ADD_LIVROS(form.value)
          $q.notify({ message: 'Livro alterado  com sucesso!', icon: 'check', color: 'positive' })
          router.push({ name: 'livros' })
        } else {
          await store.BD_ADD_LIVROS(form.value)
          $q.notify({ message: 'Livro inserido  com sucesso!', icon: 'check', color: 'positive' })
          router.push({ name: 'livros' })
        }
      } catch (error) {
        console.log(error)
      }
    }
    return {
      form,
      onSubmit,
      title,
      formLivro
    }
  }
})
</script>
