'use babel';

import SearchWebContentsView from './search-web-contents-view';
import { CompositeDisposable } from 'atom';
// import { ipcRenderer } = from 'electron';
var ipcRenderer = require('electron').ipcRenderer;

export default {

  searchWebContentsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {

    this.searchWebContentsView = new SearchWebContentsView(state.searchWebContentsViewState, '');
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.searchWebContentsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'search-web-contents:toggle': () => this.toggle()
    }));

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'search-web-contents:load': () => this.load(),
      'search-web-contents:load-with-cutting': () => this.loadCut()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.searchWebContentsView.destroy();
  },

  serialize() {
    return {
      searchWebContentsViewState: this.searchWebContentsView.serialize()
    };
  },

  loadCut() {
      console.log('loadCut!');
      let editor;
      let src;
      if (editor = atom.workspace.getActiveTextEditor()) {
          let selection = editor.getSelectedText();
          console.log(selection);
          selection = encodeURIComponent(selection);
          editor.insertText('');
          src = 'https://google.co.jp/search?q=' + selection;
      } else {
          src = 'https://google.co.jp/';
      }
      const elem = this.searchWebContentsView.getElement();
      const webv = elem.firstElementChild;
      webv.loadURL(src);
      if (!this.modalPanel.isVisible) {
          this.modalPanel.show();
      }
  },

  load() {
      console.log('load!');
      let editor;
      let src;
      if (editor = atom.workspace.getActiveTextEditor()) {
          editor.selectToBeginningOfLine();
          let selection = editor.getSelectedText();
          console.log(selection);
          selection = encodeURIComponent(selection);
          src = 'https://google.co.jp/search?q=' + selection;
      } else {
          src = 'https://google.co.jp/';
      }
      const elem = this.searchWebContentsView.getElement();
      let webv = elem.firstElementChild;
      webv.addEventListener('did-finish-load', e => {
          console.dir('contents: ' + webv.getTitle());
          // let contents = document.querySelector('#wowow::shadow > #webv');
          console.log('webv: ')
          console.dir(webv);
webv.send("retrieveUnreadCount");
          atom.workspace.open().then(editor => {
              if (editor) {
                  const r = new Range(Range.start, Range.end);
                  editor.setTextInBufferRange(r, elem.querySelector('#webv').shadowRoot.innerHTML);
              }
          });
      });
      const res = webv.loadURL(src);
      webv.send("retrieveUnreadCount");
      console.dir('web contents: ' + webv.webContents);
      if (!this.modalPanel.isVisible) {
          this.modalPanel.show();
      }
  },

  toggle() {
    console.log('SearchWebContents was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
