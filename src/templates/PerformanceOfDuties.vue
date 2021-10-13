<template>
  <div class="template" ref="template">
    <div class="header">
      <field-component full v-model="to_title" help="должность руководителя"/>
      <field-component full v-model="to_name" help="Ф.И.О. руководителя"/>
      <field-component full v-model="from_title" help="должность заявителя" before="от "/>
      <field-component full v-model="from_name" help="Ф.И.О. заявителя"/>
    </div>

    <div class="caption" style="margin-top: 40px;">
      <p>Заявление</p>
    </div>

    <div class="content" style="margin-top: 20px;">
      <p>
        <field-component v-model="from" help="Ф.И.О. и должнойсть заявителя" before="Я, " fieldStyle="text-indent: 25pt" style="display: flex"/>
        <field-component v-model="to" help="Ф.И.О. и должнойсть замещаемого" before="согласен на исполнение обязанностей "/>
        с
        <field-component v-model="start" help="дата начала" fieldStyle="text-align: center"/>
        года на период временной нетрудоспособности.
        <br/><br/>
        С должностными обязанностями, условиями оплаты труда ознакомлен.
      </p>
    </div>

    <div style="margin-top: 60px; flex-grow: 1;">
      <div class="footer">
        <field-component full v-model="date" help="дата заявления" fieldStyle="text-align: center"/>
        <field-component full v-model="name" help="Ф.И.О. заявителя" fieldStyle="text-align: center"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { sync, get } from 'vuex-pathify'
  import FieldComponent from '@/components/FieldComponent.vue'

  export default {
    name: 'performance-of-duties',
    version: '1.0',
    components: { FieldComponent },
    computed: {
      ...sync('document/performance-of-duties@*'),
      ...get('holidays/*'),
    },
    methods: {
      preventLineBreaks(e) {
        if(e.which == 13) e.preventDefault()
      },
    },
  }
</script>

<style scoped>
  .header {
    margin-left: 55%;
  }
  .caption {
    text-align: center;
  }
  .content {
    text-align: justify;
    text-indent: 25pt;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .footer p>span:last-child {
    float: right;
  }
  .visa>div>div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  p, span {
    font-family: "Times NR Cyr MT";
    font-size: 14pt;
    margin: 0;
    line-height: 24pt;
  }
  .help {
    border-top: 1px solid;
    font-size: 8pt;
    text-align: center;
    line-height: 8pt;
    padding-top: 2px;
  }
  .template {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: 257mm;
  }
</style>
