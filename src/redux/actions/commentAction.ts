import { Dispatch } from 'redux';
import { ALERT, IAlertType } from '../types/alertTypes';
import { IComment } from '../../utils/TypeScript';
import { getAPI, postAPI, patchAPI, deleteAPI } from '../../utils/FetchData';
import { GET_COMMENTS, ICreateCommentType, IDeleteType, IGetCommentsType, IReplyCommentType, IUpdateType, REPLY_COMMENT, UPDATE_COMMENT, UPDATE_REPLY, CREATE_COMMENT } from '../types/commentTypes';
import { checkTokenExp } from '../../utils/CheckTokenExp';

export const createComment = (data: IComment, token: string) => 
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      const res = await postAPI('comments', data, access_token);
      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user }
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg }});
    }
} 

export const getComments = (id: string) => 
  async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      const res = await getAPI(`comments/blog/${id}`);
      
      dispatch({
        type: GET_COMMENTS,
        payload: {
          data: res.data,
          total: res.data.length
        }
      });

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg }});
    }
} 

export const replyComment = (data: IComment, token: string) => 
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      const res = await postAPI('reply_comment', data, access_token);

      // dispatch({
      //   type: REPLY_COMMENT,
      //   payload: { ...res.data, user: data.user, reply_user: data.reply_user }
      // });

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg }});
    }
} 

export const updateComment = (data: IComment, token: string) => 
  async (dispatch: Dispatch<IAlertType | IUpdateType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      const res = await patchAPI(`comments/${data.id}`, data, access_token);

      dispatch({
        type: UPDATE_COMMENT,
        payload: res.data
      });

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg }});
    }
} 

export const deleteComment = (data: IComment, token: string) => 
  async (dispatch: Dispatch<IAlertType | IDeleteType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      // dispatch({
      //   type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
      //   payload: data
      // });

      await deleteAPI(`comment/${data.id}`, access_token);

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg }});
    }
} 