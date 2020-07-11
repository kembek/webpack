export default class Post {
  constructor(title, date) {
    this.title = title;
    this.date = new Date(date);
  }

  toString() {
    const { title, date } = this;

    return JSON.stringify({
      title,
      date
    });
  }
}
