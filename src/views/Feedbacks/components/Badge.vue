<template>
  <span
    :class='`bg-${color}`'
    class='p-2 text-xs font-black text-white uppercase rounded-full'
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'

const TYPES = {
  ISSUE: 'Problema',
  IDEA: 'Idéia',
  OTHER: 'Outros'
}

const COLOR = {
  ISSUE: 'brand-danger',
  IDEA: 'brand-warning',
  OTHER: 'brand-graydark'
}

export default {
  props: {
    type: {
      type: String,
      required: true
    },

    setup (props) {
      const label = computed(() => {
        return TYPES[props.type]
      })

      const color = computed(() => {
        return COLOR[props.type]
      })

      return {
        label,
        color
      }
    }
  }
}
</script>
