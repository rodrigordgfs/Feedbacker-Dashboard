<template>
  <Hero
    @create-account='handleCreatAccount'
    @login='handleLogin'
  />
  <Contact />
  <div class='flex justify-center py-10 bg-brand-gray'>
    <p class='font-medium text-center text-gray-800'>Feedbacker © 2023</p>
  </div>
</template>

<script>
import Hero from './components/Hero'
import Contact from './components/Contact'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    Hero,
    Contact
  },

  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {}

    function handleCreatAccount () {}

    return {
      handleLogin,
      handleCreatAccount
    }
  }
}
</script>

<style lang='scss' scoped></style>
