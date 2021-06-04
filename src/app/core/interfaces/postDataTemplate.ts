export interface PostDataTemplate {
  postID: string;
  slug: string;
  createdDate: number;
  reads: number;
  votes: number;
  author: {
    uuid: string;
    name: string;
    img: string;
  };
  title: string;
  description: string;
  body: string;
  featuredImg: string | null;
  tags: [] | Array<string>;
  status: string;
}
