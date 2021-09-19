<template>
  <div class="template">
    <div class="header">
      <p class="field">
        <span contenteditable @keydown="preventLineBreaks">{{ to.title }}</span>
        <span class="help hide-in-print">должность руководителя</span>
      </p>
      <p class="field">
        <span contenteditable @keydown="preventLineBreaks">{{ to.name }}</span>
        <span class="help hide-in-print">Ф.И.О. руководителя</span>
      </p>
      <p style="position: absolute; padding-left: 5px;">от</p>
      <p class="field">
        <span style="text-indent: 24px;" contenteditable @keydown="preventLineBreaks">{{ from.title }}</span>
        <span class="help hide-in-print">должность заявителя</span>
      </p>
      <p class="field">
        <span contenteditable @keydown="preventLineBreaks">{{ from.name }}</span>
        <span class="help hide-in-print">Ф.И.О. заявителя</span>
      </p>
    </div>

    <div class="caption" style="margin-top: 40px;">
      <p>заявление</p>
    </div>

    <div class="content" style="margin-top: 20px;">
      <p>
        По семейным обстоятельствам прошу внести изменения в график отпусков на
        <span class="field">
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ yarn }}</span>
          <span class="help hide-in-print">год</span>
        </span>
        год, а именно: отпуск запланированный графиком отпусков на
        <span class="field">
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ yarn }}</span>
          <span class="help hide-in-print">год</span>
        </span>
        год с
        <span class="field">
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ start }}</span>
          <span class="help hide-in-print">начало отпуска</span>
        </span>
        количеством
        <span class="field">
          <span style="text-align: center;" contenteditable @input="(e) => days = e.target.innerHTML" @keydown="preventLineBreaks">{{ days }}</span>
          <span class="help hide-in-print">дней</span>
        </span>
        {{ declOfNum(days, ['календарный', 'календарных', 'календарных']) }}
        {{ declOfNum(days, ['день', 'дня', 'дней']) }}, перенести на период
        <span v-for="(period, index) in periods" :key="index">
          c
          <span class="field">
            <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ period.start }}</span>
            <span class="help hide-in-print">начало отпуска</span>
          </span>
          –
          <span class="field">
            <span style="text-align: center;" contenteditable @input="(e) => period.days = e.target.innerHTML" @keydown="preventLineBreaks">{{ period.days }}</span>
            <span class="help hide-in-print">дней</span>
          </span>
          {{ declOfNum(period.days, ['календарный', 'календарных', 'календарных']) }}
          {{ declOfNum(period.days, ['день', 'дня', 'дней']) }}<span v-if="periods.length > 1" class="btn hide-in-print" @click="() => removePeriod(index)">➖</span>{{ index == periods.length - 1 ? '.' : ',' }}
        </span>
        <span v-if="periods.length < 5" class="btn hide-in-print" @click="addPeriod">➕</span>
      </p>
    </div>

    <div class="footer" style="margin-top: 60px;">
      <p class="field">
        <span style="display: flex; gap: 5px;">
          «
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">06</span>
          »
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">сентября</span>
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">2021</span>
          г.
        </span>
        <span class="help hide-in-print">дата заявления</span>
      </p>
      <p class="field">
        <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ name }}</span>
        <span class="help hide-in-print">Ф.И.О. заявителя</span>
      </p>
    </div>

    <div class="visa">
      <div class="hide-in-print toolbox">
        <p>
          <label>
            <input type="checkbox" v-model="visa.required">
            Завизировать заявление
          </label>
        </p>
      </div>
      <div :style="{visibility: visa.required ? 'visible' : 'hidden'}">
        <p style="text-transform: uppercase; font-weight: 700; padding-left: 5px;">Согласовано:</p>
        <div>
          <p class="field" style="max-width: 60%;">
            <span contenteditable @keydown="preventLineBreaks">{{ visa.title }}</span>
            <span class="help hide-in-print">должность</span>
          </p>
          <p class="field">
            <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ visa.name }}</span>
            <span class="help hide-in-print">Ф.И.О.</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'redistribution',

    props: {
      to: Object,
      from: Object,
      yarn: Number,
      start: String,
      days: Number,
      periods: Array,
      visa: Object,
      date: String,
      name: String,
    },
    computed: {
      payment_required () {
        return this.has_matpom || this.payments.densod
      },
      two_matpom () {
        return this.payments.matpom[0] && this.payments.matpom[1]
      },
      has_matpom () {
        return this.payments.matpom[0] || this.payments.matpom[1]
      },
    },
    methods: {
      preventLineBreaks(e) {
        if(e.which == 13) e.preventDefault()
      },
      removePeriod(index) {
        this.periods.splice(index, 1)
      },
      addPeriod: function() {
        this.periods.push({ start: '09.10.2021', days: 14 })
      },
      declOfNum(n, titles) {
        return titles[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
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
    flex-grow: 1;
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
  .toolbox {
    background-color: #eef9f6;
    padding: 10px;
    margin: 10px 0;
    border-radius: 3px;
    text-indent: 0;
  }
  .toolbox * {
    font-size: 12pt !important;
    line-height: 12pt;
  }
  .template {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: 257mm;
  }
  .btn:hover {
    opacity: 0.6;
  }
</style>
