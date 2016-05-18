'use babel';

export default class SearchWebContentsView {

  constructor(serializedState, src) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('search-web-contents');
    this.element.id = 'wowow';

    /*
    const scriptTag = document.createElement('script');
    scriptTag.innerText = "console.log('');";
    this.element.appendChild(scriptTag);
    */

    // Create message element
    const webv = document.createElement('webview');
    webv.id = 'webv';
    webv.setAttribute('style', 'display:inline-flex; width:640px; height:800px');
    webv.setAttribute('src', src);
    webv.setAttribute('preload', 'webview.js');
    this.element.appendChild(webv);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
