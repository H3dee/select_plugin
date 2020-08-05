const getTemplate = (data = [], placeholder = 'Выберите элемент') => {
  const items = data
      .map( item => {
      return `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`})
      .join('')
          

  return ` <div class="select__input" data-type="input">
      <p data-type="value">${placeholder}</p>
      <div class="input__icon">
        <img src="https://image.flaticon.com/icons/svg/25/25623.svg" alt=" ">
      </div>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
       ${items}
      </ul>
    </div> `;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options
    this.selectedId = null
    this.#render();
    this.#setup();
  }

  #render() {
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(this.options.data, this.options.placeholder);
  }

  #setup() {
    this.handleInputClick = this.handleInputClick.bind(this);
    this.$el.addEventListener("click", this.handleInputClick);
    this.$inputValue = this.$el.querySelector('[data-type="value"]')
  }

  handleInputClick(event) {
    if (event.target.dataset.type === "input") this.#toggle();
    else if(event.target.dataset.type === 'item') this.selected(event.target.dataset.id)
  }

  selected(id){
    this.selectedId = id
    this.$inputValue.textContent = this.current.value
    this.$el.querySelectorAll('.select__item')
                                    .forEach( item => {
                                          console.log(item)
                                          console.log(this.current)
                                          if(Number(item.getAttribute('data-id')) !== this.current.id) item.classList.remove('selected')
                                          else item.classList.add('selected')
                                    })
    this.close()
  }

  #toggle() {
    this.isOpen ? this.close() : this.open();
  }

  #changeIcon(url) {
    const icon = this.$el.querySelector(".input__icon > img");
    icon.setAttribute("src", url);
  }

  get current(){
      return this.options.data.find( item => item.id === Number(this.selectedId))
  }

  get isOpen() {
    return this.$el.classList.contains("opened");
  }

  open() {
    this.#changeIcon("https://image.flaticon.com/icons/svg/25/25223.svg");
    this.$el.classList.add("opened");
  }

  close() {
    this.#changeIcon("https://image.flaticon.com/icons/svg/25/25623.svg");
    this.$el.classList.remove("opened");
  }

  destroy() {
    this.$el.removeEventListener("click", this.handleInputClick);
    this.$el.innerHTML = ``;
  }
}
