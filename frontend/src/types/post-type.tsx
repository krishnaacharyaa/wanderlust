type Post = {
  _id: string;
  authorName: string;
  title: string;
  imageLink: string;
  timeOfPost: string;
  description: string;
  categories: string[];
  authorId?: string;
};

export enum PostType {
  FEATURE="feature",
  POST="post",
  LATEST="latest",
}

export default Post;
