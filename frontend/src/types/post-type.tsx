type Post = {
  _id: string;
  authorName: string;
  title: string;
  imageLink: string;
  timeOfPost: string;
  description: string;
  categories: string[];
  numberOfLikes: number;
  likes: string[];
};

export default Post;
