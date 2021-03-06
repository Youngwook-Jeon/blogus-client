import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/global/Loading';
import CardVert from '../../components/cards/CardVert';
import { IBlog, IParams, RootStore } from '../../utils/TypeScript';
import { getBlogsByCategoryId } from '../../redux/actions/blogAction';
import Pagination from '../../components/global/Pagination';

const BlogsByCategory = () => {
  const { category, blogsCategory } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { slug } = useParams<IParams>();

  const [categoryId, setCategoryId] = useState('');
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  const history = useHistory();
  const { search } = history.location;

  useEffect(() => {
    const cat = category.find(item => item.name === slug);
    if (cat) setCategoryId(cat.id);
  }, [slug, category]);

  useEffect(() => {
    if (!categoryId) return;

    if (blogsCategory.every(item => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search));
    } else {
      const data = blogsCategory.find(item => item.id === categoryId);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) history.push(data.search);
    }

  }, [categoryId, blogsCategory, dispatch, search, history]);

  const handlePagination = (num: Number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByCategoryId(categoryId, search));
  }

  if (!blogs) return <Loading />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {
          blogs.map(blog => (
            <CardVert key={blog.id} blog={blog} />
          ))
        }
      </div>

      {
        total > 1 && 
        <Pagination total={total} callback={handlePagination} />
      }

    </div>
  );
};

export default BlogsByCategory;
