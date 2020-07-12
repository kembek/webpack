export default class Post {
  constructor(title, date, img) {
    this.title = title;
    this.date = new Date(date);
    this.img = img;
  }

  toString() {
    const { title, date, img } = this;

    return JSON.stringify(
      {
        title,
        date,
        img
      },
      null,
      2
    );
  }
}
