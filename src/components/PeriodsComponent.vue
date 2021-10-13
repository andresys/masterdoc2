<template>
  <span class="periods">
    <slot/>
    <span
      v-if="!hideAdd"
      class="help-btn hide-in-print"
      @click="addPeriod"
    >➕</span>
  </span>
</template>

<script>
  export default {
    name: 'PeriodsField',
    props: {
      // value: Array,
      add: Object,
      hideAdd: {type: Boolean, default: false}
    },
    methods: {
      addPeriod: function() {
        // this.value.push(this.add)
        this.$emit('add', this)
      },
      // removePeriod(index) {
      //   this.value.splice(index, 1)
      // },
    },
  }
</script>

<style scoped lang="scss">
  .periods {
    display: inline;
    >* {
      margin-left: 5px;
    }
    .help-btn:hover {
      opacity: 0.6;
      cursor: pointer;
    }
  }
</style>
