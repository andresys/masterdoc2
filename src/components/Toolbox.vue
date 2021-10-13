<template>
  <div
    :class="['toolbox', position]"
  >
    <div
      :class="['button', {'active': active}]"
      @click="active=!active"
    >
      <mdicon
        v-if="hasPanel"
        name="cog"
      />
      <mdicon
        v-else
        name="content-save-outline"
      />
    </div>
    <div
      v-if="hasPanel && active"
      class="panel"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toolbox',
    props: {
      position: {
        type: String,
        default: 'right',
      }
    },
    data() {
      return {
        active: false,
      }
    },
    computed: {
      hasPanel () {
        return !!(
          this.$slots.default
        )
      },
    },
  }
</script>

<style scoped lang="scss">
  .toolbox {
    position: relative;
    width: 0;
    margin: 0;
    padding: 0;
    text-indent: 0;
    display: inline-block;
    >div {
      width: 30px;
      margin: 2px 0;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.right {
      float: right;
      left: 20px;
      clear: right;
      >.panel {
        right: 5px;
      }
    }
    &.left {
      float: left;
      right: 50px;
      clear: left;
      >.panel {
        left: 35px;
      }
    }
    &.float-right {
      float: right;
      margin-right: 30px;
      >.panel {
        right: 5px;
      }
    }
    &.float-left {
      float: left;
      >.panel {
        left: 35px;
      }
    }
    .button {
      border-radius: 50%;
      color: #686868;
    }
    .button:hover, .button.active {
      box-shadow: 0 0 8px #e7e7e7a0;
      cursor: pointer;
      color: #404040;
      background-color: #e7e7e7a0;
    }
    .button:active {
      transform: translateY(2px);
    }
    >.panel {
      display: block;
      margin: 0;
      height: initial;
      background-color: #eef9f6;
      position: absolute;
      top: 0;
      overflow: hidden;
      width: 400px;
      padding: 10px;
      box-shadow: 0 0 4px #404040;
      border-radius: 5px;
      * {
        color: initial;
        font-size: 12pt !important;
        line-height: 12pt;
        font-family: initial !important;
      }
      p {
        text-align: left;
      }
    }
    .title {
      margin-bottom: 10px;
      font-weight: bold;
      border-bottom: 1px solid #aeaeae;
      padding-bottom: 5px;
    }
  }
  @media print {
    .toolbox {
      display: none;
    }
  }
</style>