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
      <toolbox>
        <div>
          <p>Запросить выплаты в соответствии с Положением о муниципальной службе в городе Твери:</p>
          <p style="margin-top: 10px">
            <label class="hide-in-print" style="margin-left: 10px">
              <input
                v-model="matpom1"
                type="checkbox"
                style="margin-right: 5px"
              />
              <input
                v-if="matpom1"
                v-model="matpom2"
                type="checkbox"
                style="margin-right: 5px"
              />Материальная помощь
            </label>
          </p>
          <p>
            <label class="hide-in-print" style="margin-left: 10px">
              <input
                v-model="densod"
                type="checkbox"
                style="margin-right: 5px"
              >Денежное содержание
            </label>
          </p>
          <p style="margin-top: 10px">
            <label class="hide-in-print">
              <input
                v-model="perfomance_required"
                type="checkbox"
                style="margin-right: 5px"
              />Возложить исполнение должностных обязанностей
            </label>
          </p>
          <p style="margin-top: 10px">
            <label>
              <input type="checkbox" v-model="visa_required">
              Завизировать заявление
            </label>
          </p>
        </div>
      </toolbox>
      <p>
        Прошу предоставить ежегодный оплачиваемый отпуск c
        <field-component v-model="start" help="дата начала" fieldStyle="text-align: center"/>
        по
        <field-component v-model="end" help="дата окончания" fieldStyle="text-align: center"/>
        количеством
        <field-component v-model="days" help="дней" fieldStyle="text-align: center"/>
        {{ declOfNum(days, ['календарный', 'календарных', 'календарных']) }}
        {{ declOfNum(days, ['день', 'дня', 'дней']) }}.
      </p>

      <p v-if="payment_required">
        В связи с уходом в ежегодный оплачиваемый отпуск прошу
        <template v-if="has_matpom">выплатить {{ this.two_matpom ? 'две материальных помащи' : 'материальную помощь' }} в размере денежного содержания,</template>
        <template v-if="has_matpom && densod"> а также </template>
        <template v-if="densod">произвести единовременную выплату в размере денежного содержания,</template>
        в соответствии с Положением о муниципальной службе в городе Твери.
      </p>

      <p v-if="perfomance_required">
        На время ежегодного оплачиваемого отпуска исполнение обязанностей
        {{ from_title }}
        {{ from_name }}
        прошу возложить на
        <field-component v-model="perfomance_title" help="должность лица исполняющего обязанности"/>
        <span>&nbsp;</span>
        <field-component v-model="perfomance_name" help="Ф.И.О. лица исполняющего обязанности" after="."/>
      </p>
    </div>

    <div style="margin-top: 60px; flex-grow: 1;">
      <div class="footer">
        <field-component full v-model="date" help="дата заявления" fieldStyle="text-align: center"/>
        <!--p class="field">
          <span style="display: flex; gap: 5px;">
            «
            <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">06</span>
            »
            <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">сентября</span>
            <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">2021</span>
            г.
          </span>
          <span class="help hide-in-print">дата заявления</span>
        </p-->
        <field-component full v-model="name" help="Ф.И.О. заявителя" fieldStyle="text-align: center"/>
      </div>
    </div>

    <div class="visa">
      <div :style="{visibility: visa_required ? 'visible' : 'hidden'}">
        <p style="text-transform: uppercase; font-weight: 700; padding-left: 5px;">Согласовано:</p>
        <div>
          <field-component full v-model="visa_title" help="должность" style="max-width: 60%;"/>
          <field-component full v-model="visa_name" help="Ф.И.О." fieldStyle="text-align: center"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { sync } from 'vuex-pathify'
  import FieldComponent from '@/components/FieldComponent.vue'
  import Toolbox from '@/components/Toolbox.vue'

  export default {
    name: 'vacation',
    components: { FieldComponent, Toolbox },
    computed: {
      ...sync('document/vacation@*'),
      payment_required () {
        return this.has_matpom || this.densod
      },
      two_matpom () {
        return this.matpom1 && this.matpom2
      },
      has_matpom () {
        return this.matpom1 || this.matpom2
      },
    },
    methods: {
      preventLineBreaks(e) {
        if(e.which == 13) e.preventDefault()
      },
      declOfNum(n, titles) {
        return titles[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
      },
    },
    watch: {
      matpom1(val) {
        if(!val) {
          this.matpom2 = false
        }
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
  p {
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
