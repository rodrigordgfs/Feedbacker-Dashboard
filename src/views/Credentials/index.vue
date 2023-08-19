<template>
  <div class='flex justify-center w-full h-28 bg-brand-main'>
    <HeaderLogged />
  </div>
  <div class='flex flex-col items-center justify-center h-64 bg-brand-gray'>
    <h1 class='text-4xl font-black text-center text-gray-800'>Credenciais</h1>
    <p class='text-lg text-center text-gray-800 font-regular'>
      Guia de instalação e geração de suas credenciais
    </p>
  </div>
  <div class='flex justify-center w-full h-full'>
    <div class='flex flex-col w-4/5 max-w-6xl py-10'>
      <h1 class='text-3xl font-black text-brand-graydark'>
        Instalação e configuração
      </h1>
      <p class='mt-10 text-lg  text-gray-800 font-regular'>
        Este aqui é a sua chave de api.
      </p>
      <content-loader
        v-if="storeGlobal.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class='flex py-3 px-5 mt-2 w-2/3 justify-between rounded bg-brand-gray'
      >
        <span v-if="state.hasError">
          Erro ao carregar a API Key
        </span>
        <span v-else>{{ apiKey }}</span>
        <div class='flex ml-20 mr-5' v-if="!state.hasError">
          <icon
            name='Copy'
            :color='brandColors.graydark'
            size='24'
            class='cursor-pointer'
            @click="handleCopy"
          />
          <icon
            name='Loading'
            :color='brandColors.graydark'
            size='24'
            class='cursor-pointer ml-3'
            @click="handleGenerateApiKey"
          />
        </div>
      </div>
      <p class='mt-5 text-lg text-gray-800 font-regular'>
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <content-loader
        v-if="storeGlobal.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class='py-3 px-5 mt-2 rounded bg-brand-gray w-2/3 overflow-x-scroll'
      >
        <span v-if="state.hasError">
          Erro ao carregar o script
        </span>
        <pre v-else>
          &lt;script src="http://rodrigordgfs-feedbacker-widget.netlify.app?apikey="{{ apiKey }}"/&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from './components/HeaderLogged'
import useStore from '@/hooks/useStore'
import pallete from '@/assets/pallete'
import Icon from '@/components/Icon'
import { computed, reactive, watch } from 'vue'
import ContentLoader from '@/components/ContentLoader'
import services from '@/services'
import { setApiKey } from '@/store/user'
import { useToast } from 'vue-toastification'

export default {
  components: {
    HeaderLogged,
    Icon,
    ContentLoader
  },

  setup () {
    const storeUser = useStore('User')
    const storeGlobal = useStore('Global')
    const toast = useToast()

    const apiKey = computed(() => storeUser.currentUser?.apiKey)

    watch(() => storeGlobal.isLoading, () => {
      if (!storeUser.currentUser?.apiKey) {
        handleError(true)
      } else {
        handleError(false)
      }
    })

    const state = reactive({
      isLoading: false,
      hasError: false
    })

    const handleGenerateApiKey = async () => {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()
        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    const handleCopy = async () => {
      try {
        toast.clear()
        await navigator.clipboard.writeText(storeUser.currentUser?.apiKey).then(() => {
          toast.success('API Key copiada com sucesso!')
        })
      } catch (error) {
        handleError(error)
      }
    }

    const handleError = (error) => {
      state.isLoading = false
      state.hasError = !!error
    }

    return {
      storeUser,
      storeGlobal,
      apiKey,
      state,
      brandColors: pallete.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
