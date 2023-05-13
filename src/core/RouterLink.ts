export default class RouterLink extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.ready()
    this.shadowRoot!.querySelector("a")!.addEventListener("click", this.handlerEvent)
  }
  static get styles() {
    return /* CSS */ `
      :host{
        display: block;
      }
    `
  }
  handlerEvent(event: Event) {
    event.preventDefault();
    
    this.dispatchEvent(new CustomEvent("router-link", {
      composed: true,
      bubbles: true,
      detail: this.getAttribute("href")
    }))
  }
  ready() {
    this.shadowRoot!.innerHTML = /*html*/ `
        <style>${RouterLink.styles}</style>
        <a href="${this.hasAttribute("goto") ? this.getAttribute("goto") : '/'}">
          <slot>Inicio</slot>
        </a>
      `
  }
  disconnectedCallback() {
    this.shadowRoot!.innerHTML = /* html */ "";
  }

  attributeChangedCallback(attr: any, old: any, now: any) {
    if (typeof attr !== "string") {
      throw new Error("This Arg so much string")
    }
  }


  static get observedAttributes() {
    return [''];
  }
}
window.customElements.define("router-link", RouterLink);