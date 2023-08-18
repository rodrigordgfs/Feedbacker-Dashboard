<template>
  <div class='flex items-center justify-between w-4/5 max-w-6xl py-10'>
    <div class='w-28 lg:w-36'>
      <img src='@/assets/images/logo.png' alt='Logo' />
    </div>
    <div class='flex'>
      <ul class='flex list-none'>
        <li
          class='px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none'
          @click="() => router.push({ name: 'Credentials' })"
        >
          Credenciais
        </li>
        <li
          class='px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none'
          @click="() => router.push({ name: 'Feedbacks' })"
        >
          Feedbacks
        </li>
        <li
          class='px-6 py-2 mr-2 font-bold bg-white text-brand-main rounded-full cursor-pointer focus:outline-none'
          @click='handleLoggout'
        >
          {{ loggoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useStore from '../../../hooks/useStore'
import { computed } from 'vue'
import { cleanCurrentUser } from '../../../store/user'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    const loggoutLabel = computed(() => {
      if (!store.currentUser?.name) {
        return '...'
      }
      return `${store.currentUser.name} (Sair)`
    })

    const handleLoggout = () => {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      loggoutLabel,
      handleLoggout
    }
  }
}
</script>
