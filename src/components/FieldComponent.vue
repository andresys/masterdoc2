<template>
  <component
    :is="full ? 'p' : 'span'"
    class="field"
    @click="setFocus"
  >
    <span :style="fieldStyle">
      <span
        v-if="before"
        v-text="before"
        class="before"
      />
      <span
        @keydown="preventLineBreaks"
        @input="inputData"
        contenteditable
        v-text="val"
        ref="field"
      />
      <span
        v-if="after"
        v-text="after"
        class="after"
      />
    </span>
    <span class="help hide-in-print">{{ help }}</span>
  </component>
</template>

<script>
  export default {
    name: 'MasterField',
    inheritAttrs: false,
    props: {
      value: [String, Number],
      help: String,
      full: {
        type: Boolean,
        default: false,
      },
      fieldStyle: String,
      before: String,
      after: String,
    },
    data () {
      return {
        val: this.value,
      }
    },
    methods: {
      preventLineBreaks(e) {
        if(e.which == 13) e.preventDefault()
      },
      inputData(e) {
        this.$emit('input', e.target.innerText)
      },
      setFocus() { this.$refs.field.focus() },
    }
  }
</script>

<style lang="scss" scoped>
  p.field {
    display: flex;
    flex-direction: column;
  }
  span.field {
    display: inline-flex;
    flex-direction: column;
  }
  .field>span:first-child {
    padding-left: 5px;
    padding-right: 5px;
    text-indent: 0;
    background-color: aliceblue;
  }
  .field>span:first-child::before, .field>span:first-child::after {
    content: " ";
    display: inline-block;
  }
  .help {
    border-top: 1px solid;
    font-size: 8pt;
    text-align: center;
    line-height: 8pt;
    padding-top: 2px;
    text-indent: 0;
  }
  span[contenteditable=true] {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  @mixin cleanmode() {
    .field>span:first-child {
      background: none;
    }
    .field>span:first-child::before,
    .field>span:first-child::after {
      display: none;
    }
    .hide-in-print {
      visibility: hidden;
    }
  }
  .hover { @include cleanmode; }
  @media print {
    @include cleanmode;
    span.field {
      display: inline !important;
    }
    .hide-in-print {
      display: none;
    }
  }
</style>
