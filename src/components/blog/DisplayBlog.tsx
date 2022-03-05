import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IBlog, RootStore, IUser, IComment } from '../../utils/TypeScript';
// import Input from '../comments/Input';
// import Comments from '../comments/Comments';
// import { createComment, getComments } from '../../redux/actions/commentAction';
import Loading from '../global/Loading';
import Pagination from '../global/Pagination';

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  // const { auth, comments } = useSelector((state: RootStore) => state);
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  // const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // const handleComment = (body: string) => {
  //   if (!auth.user || !auth.access_token) return;

  //   const data = {
  //     content: body,
  //     user: auth.user,
  //     blog_id: (blog.id as string),
  //     blog_user_id: (blog.user as IUser).id,
  //     replyCM: [],
  //     createdAt: new Date().toISOString()
  //   }
    
  //   setShowComments([data, ...showComments]);
  //   dispatch(createComment(data, auth.access_token));
  // };

  // useEffect(() => {
  //   setShowComments(comments.data);
  // }, [comments.data]);

  // const fetchComments = useCallback(async (id: string, num = 1) => {
  //   setLoading(true);
  //   await dispatch(getComments(id, num));
  //   setLoading(false);
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!blog.id) return;

  //   const num = history.location.search.slice(6) || 1;
  //   fetchComments(blog.id, num);
  // }, [blog.id, fetchComments, history]);

  // const handlePagination = (num: number) => {
  //   if (!blog.id) return;

  //   fetchComments(blog.id, num);
  // };

  return (
    <div>
      <h2 className="text-center my-3 text-capitalize fs-1" style={{ color: "#ff7a00" }}>
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {
            typeof(blog.user) !== 'string' && 
            `작성자: ${blog.user.name}`
          }
        </small>

        <small className="ms-2">
          { new Date(blog.createdAt).toLocaleString() }
        </small>
      </div>

      <div dangerouslySetInnerHTML={{
        __html: blog.content
      }} />

      <hr className="my-1" />
      {/* <h3 style={{ color: "#ff7a00" }}>댓글</h3>
      {
        auth.user 
        ? <Input callback={handleComment} />
        : <h5>
          댓글을 다시려면 <Link to={`/login?blog/${blog.id}`}>로그인</Link>이 필요합니다.
        </h5>
      }

      {
        loading
        ? <Loading />
        : showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      }

      {
        comments.total > 1 &&
        <Pagination total={comments.total} callback={handlePagination} />
      } */}

    </div>
  );
};

export default DisplayBlog;
