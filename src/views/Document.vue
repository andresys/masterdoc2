<template>
  <div class="main">

    <!-- Top bar -->
    <vue-file-toolbar-menu :content="menu" class="bar" />

    <!-- Document editor -->
    <vue-document-editor ref="editor"
      :content="content"
      :overlay="overlay"
      :zoom="zoom"
      :page_format_mm="page_format_mm"
      :page_margins="page_margins"
      :display="display"
    />
  </div>
</template>

<script>
import VueFileToolbarMenu from 'vue-file-toolbar-menu'
import VueDocumentEditor from 'vue-document-editor'
import { get } from 'vuex-pathify'

export default {
  components: { VueDocumentEditor, VueFileToolbarMenu },
  data () {
    return {
      // This is where the pages content is stored and synced
      zoom: 1.0,
      zoom_min: 0.10,
      zoom_max: 5.0,
      page_format_mm: [210, 297],
      page_margins: "20mm",
      display: "vertical", // ["grid", "vertical", "horizontal"]
      // mounted: false, // will be true after this component is mounted
      // undo_count: -1, // contains the number of times user can undo (= current position in content_history)
      // content_history: [], // contains the content states for undo/redo operations
      font_class: null,
    }
  },
  created () {
    // Initialize gesture flags
    let start_zoom_gesture = false;
    let start_dist_touch = false;
    let start_zoom_touch = false;
    // Manage ctrl+scroll zoom (or trackpad pinch)
    window.addEventListener("wheel", (e) => {
      if(e.ctrlKey){
        e.preventDefault();
        this.zoom = Math.min(Math.max(this.zoom - e.deltaY * 0.001, this.zoom_min), this.zoom_max);
      }
    }, { passive: false });
    // Manage trackpad pinch on Safari
    window.addEventListener("gesturestart", (e) => {
      e.preventDefault();
      start_zoom_gesture = this.zoom;
    });
    window.addEventListener("gesturechange", (e) => {
      e.preventDefault();
      if(!start_zoom_touch){
        this.zoom = Math.min(Math.max(start_zoom_gesture * e.scale, this.zoom_min), this.zoom_max);
      }
    });
    window.addEventListener("gestureend", () => {
      start_zoom_gesture = false;
    });
    // Manage pinch to zoom for touch devices
    window.addEventListener("touchstart", (e) => {
      if (e.touches.length == 2) {
        e.preventDefault();
        start_dist_touch = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        start_zoom_touch = this.zoom;
      }
    }, { passive: false });
    window.addEventListener("touchmove", (e) => {
      if (start_dist_touch && start_zoom_touch) {
        e.preventDefault();
        let zoom = start_zoom_touch * Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        ) / start_dist_touch;
        this.zoom = Math.min(Math.max(zoom, this.zoom_min), this.zoom_max);
      }
    }, { passive: false });
    window.addEventListener("touchend", () => {
      start_dist_touch = false;
      start_zoom_touch = false;
    }, { passive: false });
    // Manage history undo/redo events
    // const manage_undo_redo = (e) => {
    //   switch(e && e.inputType){
    //     case "historyUndo": e.preventDefault(); e.stopPropagation(); this.undo(); break;
    //     case "historyRedo": e.preventDefault(); e.stopPropagation(); this.redo(); break;
    //   }
    // }
    // window.addEventListener("beforeinput", manage_undo_redo);
    // window.addEventListener("input", manage_undo_redo); // in case of beforeinput event is not implemented (Firefox)
    // If your component is susceptible to be destroyed, don't forget to
    // use window.removeEventListener in the Vue.js beforeDestroy handler
  },
  // mounted () { this.mounted = true },
  computed: {
    ...get ('app', ['templates']),
    content () { return Array({ template: this.template, props: { class: null }}) },
    template () { return this.$route.params.template },
    // This is the menu content
    menu () {
      return [
        // Main commands
        {
          text: "Новый",
          title: "Новый документ",
          icon: "description",
          click: () => this.$router.push({ name: 'Lists' })
        },
        { text: "Печать", title: "Печать документа", icon: "print", click: () => window.print() },
        { is: "spacer" },
        // Undo / redo commands
        // { title: "Отменить", icon: "undo", disabled: !this.can_undo, hotkey: this.isMacLike ? "command+z" : "ctrl+z", click: () => this.undo() },
        // { title: "Повторить", icon: "redo", disabled: !this.can_redo, hotkey: this.isMacLike ? "shift+command+z" : "ctrl+y", click: () => this.redo() },
        // { is: "spacer" },
        // Rich text menus
        // { icon: "format_align_left", title: "Выравнивать по левому краю", active: this.isLeftAligned, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+l" : "ctrl+shift+l", click: () => document.execCommand("justifyLeft") },
        // { icon: "format_align_center", title: "Выравнивать по центру", active: this.isCentered, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+e" : "ctrl+shift+e", click: () => document.execCommand("justifyCenter") },
        // { icon: "format_align_right", title: "Выравнивать по правому краю", active: this.isRightAligned, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+r" : "ctrl+shift+r", click: () => document.execCommand("justifyRight") },
        // { icon: "format_align_justify", title: "Выравнивать по ширине", active: this.isJustified, disabled: !this.current_text_style, hotkey: this.isMacLike ? "shift+command+j" : "ctrl+shift+j", click: () => document.execCommand("justifyFull") },
        // { is: "separator" },
        // { icon: "format_bold", title: "Жирный", active: this.isBold, disabled: !this.current_text_style, hotkey: this.isMacLike ? "command+b" : "ctrl+b", click: () => document.execCommand("bold") },
        // { icon: "format_italic", title: "Курсив", active: this.isItalic, disabled: !this.current_text_style, hotkey: this.isMacLike ? "command+i" : "ctrl+i", click: () => document.execCommand("italic") },
        // { icon: "format_underline", title: "Подчеркнутый", active: this.isUnderline, disabled: !this.current_text_style, hotkey: this.isMacLike ? "command+u" : "ctrl+u", click: () => document.execCommand("underline") },
        // { icon: "format_strikethrough", title: "Зачеркнутый", active: this.isStrikeThrough, disabled: !this.current_text_style, click: () => document.execCommand("strikethrough") },
        // { is: "button-color", type: "compact", menu_class: "align-center", disabled: !this.current_text_style, color: this.curColor, update_color: (new_color) => document.execCommand('foreColor', false, new_color.hex8) },
        // { is: "separator" },
        // { icon: "format_list_numbered", title: "Нумерованный список", active: this.isNumberedList, disabled: !this.current_text_style, click: () => document.execCommand("insertOrderedList") },
        // { icon: "format_list_bulleted", title: "Маркерованный список", active: this.isBulletedList, disabled: !this.current_text_style, click: () => document.execCommand("insertUnorderedList") },
        // { html: "<b>H1</b>", title: "Заголовок 1", active: this.isH1, disabled: !this.current_text_style, click: () => document.execCommand('formatBlock', false, '<h1>') },
        // { html: "<b>H2</b>", title: "Заголовок 2", active: this.isH2, disabled: !this.current_text_style, click: () => document.execCommand('formatBlock', false, '<h2>') },
        // { html: "<b>H3</b>", title: "Заголовок 3", active: this.isH3, disabled: !this.current_text_style, click: () => document.execCommand('formatBlock', false, '<h3>') },
        // { icon: "format_clear", title: "Очистить форматирование", disabled: !this.current_text_style, click () { document.execCommand('removeFormat'); document.execCommand('formatBlock', false, '<div>'); } },
        // { icon: "splitscreen", title: "Разрыв страницы", disabled: !this.current_text_style, click: () => this.insertPageBreak() },
        
        // { is: "spacer" },
        // { // Format menu
        //   text: this.current_format_name,
        //   title: "Размер страницы",
        //   icon: "crop_free",
        //   chevron: true,
        //   menu: this.formats.map(([text, w, h]) => {
        //     return {
        //       text,
        //       active: (this.page_format_mm[0] == w && this.page_format_mm[1] == h),
        //       click: () => { this.page_format_mm = [w, h]; }
        //     }
        //   }),
        //   // menu_width: 80,
        //   // menu_height: 280
        // },
        // { // Margins menu
        //   text: this.current_margins_name,
        //   title: "Поля страницы",
        //   icon: "select_all",
        //   chevron: true,
        //   menu: this.margins.map(([text, value]) => {
        //     return {
        //       text: text+" ("+value+")",
        //       active: (this.page_margins == value),
        //       click: () => { this.page_margins = value; }
        //     }
        //   }),
        //   menu_width: 200,
        //   menu_class: "align-center"
        // },
        { // Font type
          text: "Шрифт",
          icon: "format_size",
          title: "Шрифт документа",
          chevron: true,
          menu: [
            [ "Times New Roman", null ],
            [ "Eskal Font4You", "ruk1" ],
            [ "Katherine Plus", "ruk2" ],
            [ "Old Classic", "ruk3" ],
            [ "Carolina", "ruk4" ],
            [ "English Script", "ruk6" ],
            [ "Marianna", "ruk7" ],
            [ "Denistina", "ruk8" ],
            [ "Shlapak Script", "ruk10" ],
            [ "StudioScriptTT", "ruk12" ],
            [ "ScriptC", "ruk14" ],
          ].map(([font, font_class]) => {
            return {
              html: '<span style="font-family: \'' + font + '\'">' + font + '</span>',
              title: font,
              active: this.font_class == font_class,
              click: () => { this.font_class = font_class }
            }
          }),
          // menu_width: 180,
        },
        { // Zoom menu
          text: Math.floor(this.zoom * 100) + "%",
          title: "Масштаб",
          icon: "zoom_in",
          chevron: true,
          menu: [
            ["200%", 2.0],
            ["150%", 1.5],
            ["140%", 1.4],
            ["130%", 1.3],
            ["120%", 1.2],
            ["110%", 1.1],
            ["100%", 1.0],
            ["90%", 0.9],
            ["80%", 0.8],
            ["70%", 0.7],
            ["60%", 0.6],
            ["50%", 0.5],
            ["25%", 0.25]
          ].map(([text, zoom]) => {
            return {
              text,
              active: this.zoom == zoom,
              click: () => { this.zoom = zoom; }
            }
          }),
          menu_width: 80,
          menu_height: 280,
          menu_class: "align-center"
        },
        { // Display mode menu
          title: "Режим отображения страниц",
          icon: this.display == "horizontal" ? "view_column" : (this.display == "vertical" ? "view_stream" : "view_module"),
          chevron: true,
          menu: [{
            icon: "view_module",
            active: this.display == "grid",
            click: () => { this.display = "grid"; }
          }, {
            icon: "view_column",
            active: this.display == "horizontal",
            click: () => { this.display = "horizontal"; }
          }, {
            icon: "view_stream",
            active: this.display == "vertical",
            click: () => { this.display = "vertical"; }
          }],
          menu_width: 55,
          menu_class: "align-right"
        }
      ]
    },
    current_template_title () {
      const template = this.templates.find((template) => (template.name == this.template))
      return template ? template.title : undefined 
    },
    // Formats management
    current_format_name () {
      const format = this.formats.find(([, width_mm, height_mm]) => (this.page_format_mm[0] == width_mm && this.page_format_mm[1] == height_mm));
      return format ? format[0] : (this.page_format_mm[0]+"mm x "+this.page_format_mm[1]+"mm");
    },
    formats: () => [
      ["A0 Портретный", 841, 1189],
      ["A0 Альбомный", 1189, 841],
      ["A1 Портретный", 594, 841],
      ["A1 Альбомный", 841, 594],
      ["A2 Портретный", 420, 594],
      ["A2 Альбомный", 594, 420],
      ["A3 Портретный", 297, 420],
      ["A3 Альбомный", 420, 297],
      ["A4 Портретный", 210, 297],
      ["A4 Альбомный", 297, 210],
      ["A5 Портретный", 148, 210],
      ["A5 Альбомный", 210, 148],
      ["A6 Портретный", 105, 148],
      ["A6 Альбомный", 148, 105]
    ],
    // Margins management
    // current_margins_name () {
    //   const margins = this.margins.find(([, margins]) => (this.page_margins == margins));
    //   return margins ? margins[0] : margins[1];
    // },
    // margins: () => [
    //   ["Большие", "20mm"],
    //   ["Средние", "15mm"],
    //   ["Маленькие", "10mm 15mm"],
    //   ["Очень маленькие", "5mm"]
    // ],
    // Current text style management
    // current_text_style () { return this.mounted ? this.$refs.editor.current_text_style : false; },
    // isLeftAligned () { return ["start", "left", "-moz-left"].includes(this.current_text_style.textAlign); },
    // isRightAligned () { return ["end", "right", "-moz-right"].includes(this.current_text_style.textAlign); },
    // isCentered () { return ["center", "-moz-center"].includes(this.current_text_style.textAlign); },
    // isJustified () { return ["justify", "justify-all"].includes(this.current_text_style.textAlign); },
    // isBold () {
    //   const fontWeight = this.current_text_style.fontWeight;
    //   return fontWeight && (parseInt(fontWeight) > 400 || fontWeight.indexOf("bold") == 0);
    // },
    // isItalic () { return this.current_text_style.fontStyle == "italic"; },
    // isUnderline () { // text-decoration is not overridden by children, so we query the parent stack
    //   const stack = this.current_text_style.textDecorationStack;
    //   return stack && stack.some(d => (d.indexOf("underline") == 0));
    // },
    // isStrikeThrough () { // text-decoration is not overridden by children, so we query the parent stack
    //   const stack = this.current_text_style.textDecorationStack;
    //   return stack && stack.some(d => (d.indexOf("line-through") == 0));
    // },
    // isNumberedList () { return this.current_text_style.isList && this.current_text_style.listStyleType == "decimal"; },
    // isBulletedList () { return this.current_text_style.isList && ["disc", "circle"].includes(this.current_text_style.listStyleType); },
    // isH1 () { return this.current_text_style.headerLevel == 1; },
    // isH2 () { return this.current_text_style.headerLevel == 2; },
    // isH3 () { return this.current_text_style.headerLevel == 3; },
    // curColor () { return this.current_text_style.color || "transparent"; },
    // Platform management
    // isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    // Undo / redo flags
    // can_undo () { return this.undo_count > 0; },
    // can_redo () { return this.content_history.length - this.undo_count - 1 > 0; }
  },
  methods: {
    // Page overlays (headers, footers, page numbers)
    overlay (page, total) {
      let html = ''
      // Add page numbers on each page
      if(page >= 2) {
        html += '<div style="position: absolute; bottom: 8mm; ' + ((page % 2) ? 'right' : 'left') + ': 10mm">Стр. ' + page + ' из ' + total + '</div>';
      }
      // Add custom headers and footers from page 3
      if(page == 1) {
        html += '<div class="hide-in-print" style="position: absolute; left: 0; top: 0; right: 0; padding: 3mm 5mm; background: rgba(200, 220, 240, 0.5)"><strong>/// ' + this.current_template_title + '</strong></div>';
      }
      return html;
    },
    // Undo / redo functions examples
    // undo () { if(this.can_undo){ this._mute_next_content_watcher = true; this.content = this.content_history[--this.undo_count]; } },
    // redo () { if(this.can_redo){ this._mute_next_content_watcher = true; this.content = this.content_history[++this.undo_count]; } },
    // resetContentHistory () { this.content_history = []; this.undo_count = -1; },
    // Insert page break function example
    // async insertPageBreak () {
    //   // insert paragraph at caret position
    //   document.execCommand("insertParagraph");
    //   // insert a marker at caret position (start of the new paragraph)
    //   const marker = "###PB###"; // must be regex compatible
    //   document.execCommand("insertText", false, marker);
    //   // wait for DOM update
    //   await this.$nextTick();
    //   // find the marker inside content items and split this content item in two items between the two paragraphs
    //   // only match root tags (p, div, h1, h2...) to avoid non-root tags like <li>
    //   const regexp = new RegExp("<(p|div|h\\d)( [^/>]+)*>(<[^/>]+>)*"+marker);
    //   for(let i = 0; i < this.content.length; i++) {
    //     const item = this.content[i];
    //     if(typeof item != "string") continue;
    //     const match = regexp.exec(item);
    //     if(match) {
    //       const tags_open = match[0].slice(0, -marker.length);
    //       let content_plus_tags_close = item.substr(match.index + match[0].length);
    //       // insert <br> to empty pages that would not be handled correctly by contenteditable
    //       if(content_plus_tags_close.indexOf("</") == 0) content_plus_tags_close = "<br>" + content_plus_tags_close;
    //       this.content.splice(i, 1, item.substr(0, match.index), tags_open + content_plus_tags_close);
    //       return;
    //     }
    //   }
    //   // if the code didn't return before, the split didn't work (e.g. inside a <li>). just remove the marker from the content
    //   for(let i = 0; i < this.content.length; i++) {
    //     const item = this.content[i];
    //     if(typeof item != "string" || item.indexOf(marker) < 0) continue;
    //     this.content.splice(i, 1, item.replace(marker, ''));
    //     break;
    //   }
    // },
  },
  watch: {
    // content: {
    //   immediate: true,
    //   // Fill undo / redo history stack on user input
    //   handler (new_content) {
    //     if(!this._mute_next_content_watcher) { // only update the stack when content is changed by user input, not undo/redo commands
    //       this.content_history[++this.undo_count] = new_content;
    //       this.content_history.length = this.undo_count + 1; // remove all redo items
    //     }
    //     this._mute_next_content_watcher = false;
    //   }
    // },
    // template: {
    //   immediate: true,
    //   handler (new_template) {
    //     this.resetContentHistory()
    //     this.content = Array({ template: new_template, props: { class: null }})
    //   }
    // },
    font_class: {
      immediate: true,
      handler (new_font_class) {
        this.content.forEach((page) => { page.props['class'] = new_font_class })
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // экземпляр компонента доступен как `vm`
      let exist = vm.templates.map((val) => val.name).includes(vm.template)
      if(!exist) { next('/error404') }
    })
  },
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  ::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border: 5px solid transparent;
    border-radius: 16px;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .template .hide-in-print, .template .hide-in-print p {
    font-family: initial !important;
    line-height: initial !important;
    text-transform: initial !important;
    font-weight: initial !important;
    color: initial !important;
  }
  .content[contenteditable=true] {
    background: initial;
  }
  @media print {
    .hide-in-print {
      display: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
      background: none;
    }
  }
</style>

<style scoped>
  .main {
    width: fit-content;
    min-width: 100%;
  }
  .bar {
    position: sticky;
    left: 0;
    top: 0;
    width: calc(100vw - 16px);
    z-index: 1000;
    background: rgba(248, 249, 250, 0.8);
    border-bottom: solid 1px rgb(248, 249, 250);
    backdrop-filter: blur(10px);
    --bar-button-active-color: #188038;
    --bar-button-open-color: #188038;
    --bar-button-active-bkg: #e6f4ea;
    --bar-button-open-bkg: #e6f4ea;
  }
</style>
