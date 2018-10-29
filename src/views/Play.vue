<template>
  <Page>
    <TopBottomLayout>
      <div slot="top">
        <div
          v-for="i in 30"
          :key="i">top</div>
      </div>
      <div slot="bottom">
        <div
          v-for="i in 10"
          :key="i">top</div>
      </div>
    </TopBottomLayout>
  </Page>
</template>
<script>

export default {
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>

</style>
