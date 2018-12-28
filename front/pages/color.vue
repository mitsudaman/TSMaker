<!-- Vue component -->
<template>
  <div>
    <div class="form__field">
      <div class="form__label">
        <strong>Please choose a color:</strong>
      </div>
      <div class="form__input">
        <swatches 
        v-model="color" 
        :colors="colors" 
        row-length="6" 
        popover-to="left"></swatches>
      </div>
    </div>
  </div>
</template>

<script>
  import Swatches from 'vue-swatches'

  // Import the styles too, globally
  import "vue-swatches/dist/vue-swatches.min.css"

  export default {
    components: { Swatches }, // window.VueSwatches.default - from CDN
    data () {
      return {
        color: '#b9f5f1',
        colors: [
          ["#ff7675","#fd79a8","#fdcb6e","#ffeaa7","#00b894"],
          ["#55efc4","#0984e3","#74b9ff","#a29bfe","#b2bec3"]
        ]
      }
    }
  }
</script>