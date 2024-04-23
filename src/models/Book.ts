export class Book{
    public constructor(
        public id: string = "",
        public title: string = "",
        public author: string = "",
        public publishedDate: string = "",
        public genre: string = "",
        public ISBN: string = "",
        public description: string = "",
        public coverImage: string = "",
        public pages: number = 0,
        public price: number = 0,
        public availability: boolean = true,
    ) {
    }

}