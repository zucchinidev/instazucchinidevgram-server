export interface IImage {
  createdAt: number,
  liked: boolean,
  likes: number,
  tags: string[],
  url: string,
  userId: string,
  _id?: string
}
