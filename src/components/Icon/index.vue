<template>
  <component :is='name' v-bind='$props'></component>
</template>

<script>
import Loading from './components/Loading'
import Copy from './components/Copy'

export default {
  components: {
    Loading,
    Copy
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
