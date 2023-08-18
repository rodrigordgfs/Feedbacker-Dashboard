<template>
  <div class='flex justify-between'>
    <h1 class='text-4xl font-black text-gray-800'>Entre na sua conta</h1>
    <button class='text-4xl text-gray-600 focus:outline-none' @click='close'>
      &times;
    </button>
  </div>
  <div class='mt-10'>
    <form @submit.prevent='handleSubmit'>
      <label class='block'>
        <span class='text-lg font-medium text-gray-800'>E-mail</span>
        <input
          type='email'
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          class='block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded'
          placeholder='john.doe@email.com'
          v-model='state.email.value'
        />
        <span
          v-if='!!state.email.errorMessage'
          class='block font-medium text-brand-danger'
        >
          {{ state.email.errorMessage }}
        </span>
      </label>
      <label class='block'>
        <span class='text-lg font-medium text-gray-800'>Senha</span>
        <input
          type='password'
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class='block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded'
          placeholder='**************'
          v-model='state.password.value'
        />
        <span
          v-if='!!state.password.errorMessage'
          class='block font-medium text-brand-danger'
        >
          {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        :disabled="state.isLoading"
        type='submit'
        :class="{
          'opacity-50': state.isLoading
        }"
        class='px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150 hover:opacity-75'
      >
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'

export default {
  setup () {
    const modal = useModal()

    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      }
    })

    const handleSubmit = () => {}

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>