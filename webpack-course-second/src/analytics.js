class Analytics {
  constructor() {
    this.counter = 0;
    this.destroyed = false;
  }

  handleClick() {
    this.counter += this.counter;
  }

  init() {
    document.body.addEventListener('click', this.handleClick);
  }

  destroy() {
    document.body.removeEventListener('click', this.handleClick);
    this.destroyed = true;
  }

  getClicks() {
    return this.destroyed ? `Analytics is destroyed. Total clicks = ${this.counter}` : this.counter;
  }
}

const analytics = new Analytics();
analytics.init();
console.log('lol');

window['analytics'] = analytics;
