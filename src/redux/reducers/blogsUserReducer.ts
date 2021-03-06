import { IUser } from '../../utils/TypeScript';
import { CREATE_BLOGS_USER_ID, DELETE_BLOGS_USER_ID, GET_BLOGS_USER_ID, IBlogsUser, IBlogUserType } from '../types/blogTypes';

const blogsUserReducer = (state: IBlogsUser[] = [], action: IBlogUserType): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_USER_ID:
      if (state.every(item => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state.map(item => (
          item.id === action.payload.id ? action.payload : item
        ))
      }

    case CREATE_BLOGS_USER_ID:
      return state.map(item => (
        item.id === (action.payload.user as IUser).id 
        ? {
          ...item,
          blogs: [action.payload, ...item.blogs]
        }
        : item
      ))
      
    case DELETE_BLOGS_USER_ID:
      return state.map(item => (
        item.id === (action.payload.user as IUser).id 
        ? {
          ...item,
          blogs: item.blogs.filter(blog => (
            blog.id !== action.payload.id
          ))
        }
        : item
      ))

    default:
      return state;
  }
}

export default blogsUserReducer;