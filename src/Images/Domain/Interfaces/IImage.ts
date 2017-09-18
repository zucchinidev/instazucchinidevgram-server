export interface IImage {
  createdAt: number,
  description: string,
  liked: boolean,
  likes: number,
  tags: string[],
  url: string,
  userId: string,
  _id?: string
}
