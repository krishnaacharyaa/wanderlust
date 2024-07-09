import FormBlog from '@/components/form-blog';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Post from '@/types/post-type';
import axios from 'axios';
import useAuthData from '@/hooks/useAuthData';

const EditBlog = () => {
  const { state } = useLocation();
  const [post, setPost] = useState<Post>(state?.post);
  const initialVal = post === undefined;
  const [loading, setIsLoading] = useState(initialVal);
  const { postId } = useParams();

  const userData = useAuthData();

  useEffect(() => {
    const getPostById = async () => {
      try {
        await axios.get(import.meta.env.VITE_API_PATH + `/api/posts/${postId}`).then((response) => {
          setIsLoading(false);
          setPost(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (post === undefined || post !== state?.post) {
      getPostById();
    }
  }, [state?.post]);

  const navigate = useNavigate();

  if (userData?.role === 'USER' && post?.authorId !== userData?._id) {
    navigate(-1);
  }

  if (!loading) {
    return (
      <>
        <FormBlog postId={postId} type="edit" post={post} />
      </>
    );
  } else return <h1>Loading...</h1>;
};

export default EditBlog;
