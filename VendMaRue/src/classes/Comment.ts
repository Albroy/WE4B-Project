export class Comment {
    constructor(
        public id: number,
        public title: string,
        public userid: number,
        public likes: number,
        public text: string,
        public date: Date,
        public cardid: number,
    ) {
        this.title = title;
        this.text = text;
        this.id = id;
        this.userid = userid;
        this.likes = likes;
        this.date = date;
        this.cardid = cardid;
    }
}
