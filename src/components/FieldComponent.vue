<template>
  <span class="field">
    <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ range.start }}</span>
    <span class="help hide-in-print">дата начала</span>
  </span>
</template>

<script>
  export default {
    name: 'MasterField',
  }
</script>