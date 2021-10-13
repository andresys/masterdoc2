<template>
  <span :class="['period', {'hover': hover}]">
    <slot/>
    <span
      v-if="!hideRemove"
      class="help-btn hide-in-print"
      @click="() => removePeriod()"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >➖</span>{{ end }}<!--
  --></span>
</template>

<script>
  export default {
    name: 'PeriodItemField',
    data() {
      return {
        hover: false,
      }
    },
    props: {
      // separator: {type: String, default: ','},
      end: {type: String, default: ''},
      hideRemove: {type: Boolean, default: false},
    },
    methods: {
      removePeriod() {
        // const index = this.$parent.$slots.default.map((node) => node.componentInstance).indexOf(this)
        // this.$parent.removePeriod(index)
        this.$emit('remove', this.add)
      },
    },
  }
</script>

<style scoped lang="scss">
  .help-btn:hover {
      opacity: 0.6;
      cursor: pointer;
    }
  .period {
    border: 1px dashed transparent;
    box-sizing: border-box;
    text-indent: 0px;
    border-radius: 5px;
    &.hover {
      background-color: #f0f8ff;
      border-color: gray;
    }
  }
</style>
