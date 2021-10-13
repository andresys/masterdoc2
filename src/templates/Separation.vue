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
          <p class="title">Настройки заявления</p>
          <p>
            <label>
              <input type="checkbox" v-model="visa_required">
              Завизировать заявление
            </label>
          </p>
        </div>
      </toolbox>
      <p>
        Прошу разделить ежегодный оплачиваемый отпуск на части.
        <periods-component :hideAdd="periods.length >= 5" @add="addPeriod">
          <period-item-component
            v-for="(period, index) in periods"
            :key="uid(period)"
            :end="separation(index, periods.length)"
            :hideRemove="periods.length == 1"
            @remove="removePeriod(index)"
          >
            {{ parts[index] }} часть –
            <field-component v-model="period.days" help="дней" fieldStyle="text-align: center" @input="updatePeriods"/>
            {{ declOfNum(period.days, ['день', 'дня', 'дней']) }}
            (с
            <field-component v-model="period.start" help="дата начала" fieldStyle="text-align: center" @input="updatePeriods"/>
            по
            <field-component v-model="period.end" help="дата окончания" fieldStyle="text-align: center" @input="updatePeriods"/>
            )
          </period-item-component><template v-if="periods.length > 0">.</template>
        </periods-component>
      </p>
    </div>

    <div style="margin-top: 60px; flex-grow: 1;">
      <div class="footer">
        <field-component full v-model="date" help="дата заявления" fieldStyle="text-align: center"/>
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
  import { sync, get } from 'vuex-pathify'
  import FieldComponent from '@/components/FieldComponent.vue'
  import PeriodsComponent from '../components/PeriodsComponent.vue'
  import PeriodItemComponent from '../components/PeriodItemComponent.vue'

  export default {
    name: 'separation',
    version: '1.1',
    components: { FieldComponent, PeriodsComponent, PeriodItemComponent },
    data: () => ({ 
      hoverItem: {},
      uids: {},
      parts: ['Первая', 'вторая', 'третья', 'четвертая', 'пятая'],
    }),
    computed: {
      ...sync('document/separation@*'),
      ...get('holidays/*'),
    },
    methods: {
      preventLineBreaks(e) {
        if(e.which == 13) e.preventDefault()
      },
      declOfNum(n, titles) {
        return titles[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
      },
      removePeriod(index) {
        this.periods.splice(index, 1)
        this.updatePeriods()
      },
      addPeriod: function() {
        let moment = require('moment')
        let last_period = this.periods[this.periods.length - 1]
        let days = last_period && last_period.days || 7
        let start = last_period && moment(last_period.start, 'DD.MM.YYYY').add(days, 'days') || moment()
        let end = start.clone().add(days - 1, 'days')
        this.periods.push({ start: start.format('DD.MM.YYYY'), end: end.format('DD.MM.YYYY'), days: 7 })
        this.updatePeriods()
      },
      updatePeriods() {
        this.$store.set('document/separation@periods', this.periods)
      },
      separation(index, count) {
        if(index == count - 1) { return '' }
        else if(index == count -2) {return ' и'}
        else { return ',' }
      },
      uid(obj) {
        this.idx ??= 0
        let uid = Object.keys(this.uids).find(key => this.uids[key] === obj)
        if(uid == undefined) {
          uid = ++this.idx
          this.uids[uid] = obj
        }
        return uid
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
  p.field {
    display: flex;
    flex-direction: column;
  }
  span.field {
    display: inline-flex;
    flex-direction: column;
  }
  .field>*, .field>span>* {
    padding-left: 5px;
    padding-right: 5px;
    text-indent: 0;
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
