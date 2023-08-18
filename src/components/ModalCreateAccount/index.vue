<template>
  <div class='flex justify-between'>
    <h1 class='text-4xl font-black text-gray-800'>Crie uma conta</h1>
    <button class='text-4xl text-gray-600 focus:outline-none' @click='close'>
      &times;
    </button>
  </div>
  <div class='mt-10'>
    <form @submit.prevent='handleSubmit'>
      <label class='block'>
        <span class='text-lg font-medium text-gray-800'>Nome</span>
        <input
          type='text'
          :class="{
            'border-brand-danger': !!state.name.errorMessage
          }"
          class='block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none'
          placeholder='John Doe'
          v-model='state.name.value'
        />
        <span
          v-if='!!state.name.errorMessage'
          class='block font-medium text-brand-danger'
        >
          {{ state.name.errorMessage }}
        </span>
      </label>
      <label class='block mt-5'>
        <span class='text-lg font-medium text-gray-800'>E-mail</span>
        <input
          type='email'
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          class='block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none'
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
      <label class='block mt-5'>
        <span class='text-lg font-medium text-gray-800'>Senha</span>
        <input
          type='password'
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class='block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none'
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
        <icon
          v-if='state.isLoading'
          class="animate-spin"
          name="loading"
        />
        <span v-else>Continuar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'
import { useField } from 'vee-validate'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '@/utils/validators'
import services from '../../services'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { StatusCodes } from 'http-status-codes'
import Icon from '../Icon'

export default {
  components: {
    Icon
  },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()
    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasError: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    const handleLogin = async ({ email, password }) => {
      const { data, errors } = await services.auth.login({ email, password })
      if (!errors) {
        toast.success('Conta criada com sucesso')
        window.localStorage.setItem('token', data.token)
        state.isLoading = false
        modal.close()
        router.push({ name: 'Feedbacks' })
      }
    }

    const handleSubmit = async () => {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          await handleLogin({
            email: state.email.value,
            password: state.password.value
          })
          return
        }
        if (errors.status === StatusCodes.BAD_REQUEST) {
          toast.error('Ocorreu um erro ao realizar o cadastro')
        }
        state.isLoading = false
      } catch (error) {
        state.hasError = !!error
        state.isLoading = false
        toast.error('Ocorreu um erro ao realizar o cadastro.')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
