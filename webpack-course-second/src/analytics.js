import * as $ from 'jquery';

class Analytics {
  constructor() {
    this.counter = 0;
    this.destroyed = false;
    this.isFnBind = false;
  }

  handleClick() {
    const fn = () => {
      this.counter = ++this.counter;
    };

    if (this.isFnBind) {
      return this.fn;
    } else {
      this.fn = fn;
      this.isFnBind = true;

      return fn;
    }
  }

  init() {
    $(document.body).on('click', this.handleClick());
  }

  destroy() {
    $(document.body).off('click', this.handleClick());
    this.destroyed = true;
  }

  getClicks() {
    return this.destroyed ? `Analytics is destroyed. Total clicks = ${this.counter}` : this.counter;
  }
}

const analytics = new Analytics();
analytics.init();

window['analytics'] = analytics;
