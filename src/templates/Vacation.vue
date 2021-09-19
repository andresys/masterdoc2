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
        Прошу предоставить ежегодный оплачиваемый отпуск c
        <span class="field">
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ range.start }}</span>
          <span class="help hide-in-print">дата начала</span>
        </span>
        по
        <span class="field">
          <span style="text-align: center;" contenteditable @keydown="preventLineBreaks">{{ range.end }}</span>
          <span class="help hide-in-print">дата окончания</span>
        </span>
        количеством
        <span class="field">
          <span style="text-align: center;" contenteditable @input="(e) => range.days = e.target.innerHTML" @keydown="preventLineBreaks">{{ range.days }}</span>
          <span class="help hide-in-print">дней</span>
        </span>
        {{ declOfNum(range.days, ['календарный', 'календарных', 'календарных']) }}
        {{ declOfNum(range.days, ['день', 'дня', 'дней']) }}.
      </p>
      <div class="hide-in-print toolbox">
        <p>Запросить выплаты в соответствии с Положением о муниципальной службе в городе Твери:</p>
        <p>
          <label class="hide-in-print" style="margin-left: 10px">
            <template v-for="(matpom, index) in payments.matpom">
              <input
                v-if="(index == 0) || payments.matpom[0]"
                v-model="payments.matpom[index]"
                type="checkbox"
                :key="index"
                style="margin-right: 5px"
              />
            </template>Материальная помощь
          </label>
        </p>
        <p>
          <label class="hide-in-print" style="margin-left: 10px">
            <input
              v-model="payments.densod"
              type="checkbox"
              style="margin-right: 5px"
            >Денежное содержание
          </label>
        </p>
      </div>
      <p v-if="payment_required">
        В связи с уходом в ежегодный оплачиваемый отпуск прошу
        <template v-if="has_matpom">выплатить {{ this.two_matpom ? 'две материальных помащи' : 'материальную помощь' }} в размере денежного содержания,</template>
        <template v-if="has_matpom && payments.densod"> а также </template>
        <template v-if="payments.densod">произвести единовременную выплату в размере денежного содержания,</template>
        в соответствии с Положением о муниципальной службе в городе Твери.
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
    name: 'vacation',

    props: {
      to: Object,
      from: Object,
      range: Object,
      payments: Object,
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
      declOfNum(n, titles) {
        return titles[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
      },
    },
    watch: {
      'payments.matpom'(nmp) {
        if(!nmp[0]) {
          this.payments.matpom[1] = false
        }
      }
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
</style>
