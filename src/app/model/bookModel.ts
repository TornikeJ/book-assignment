export interface IBookModel {
  id: string;
  title: string;
  description: string;
  imageLinks: {};
  authors: [string];
  publishedDate: string;
  categories: [string];
  pageCount: number;
}
