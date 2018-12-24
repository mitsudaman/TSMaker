<template>
  <div>
    <b-container class="mt-5">
      <b-button 
        id="download"
        @click="download()">download</b-button>
    </b-container>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    download() {
      // let canvas = document.getElementById("canvas");
      let link = document.createElement("a");
      link.href = this.$refs.canvas.toDataURL("image/png");
      link.download = "test.png";
      link.click();
      
      // console.log(this.$refs.canvas)
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>