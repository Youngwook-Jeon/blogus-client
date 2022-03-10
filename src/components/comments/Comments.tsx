import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IComment, IUser, RootStore } from '../../utils/TypeScript';
import AvatarComment from './AvatarComment';
import Input from './Input';

interface IProps {
  comment: IComment;
  replies: IComment[];
  parentId?: string;
  handleComment: (body: string, parentId?: string) => void;
}

const Comments: React.FC<IProps> = ({ comment, replies, parentId = null, handleComment }) => {
  const [onReply, setOnReply] = useState(false);
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState<IComment>();

  const Nav = (comment: IComment) => {
    return (
      <div>
        <i className="fas fa-trash-alt mx-2" onClick={() => console.log("TODO: handleDelete")} />
        <i className="fas fa-edit me-2" onClick={() => setEdit(comment)} />
      </div>
    )
  };

  return (
    <div className="my-3 d-flex" 
      style={{ opacity: comment.id ? 1 : 0.5, pointerEvents: comment.id ? 'initial' : 'none' }}
    >
      <AvatarComment user={comment.user} />

      <div className="w-100">
        {
          edit
          ? <Input callback={() => (console.log("TODO: handleUpdate"))} edit={edit} setEdit={setEdit} />
          : (
            <div className="comment_box">
              <div className="p-2" dangerouslySetInnerHTML={{
                __html: comment.content
              }} />

              <div className="d-flex justify-content-between p-2">
                <small style={{ cursor: 'pointer' }} onClick={() => setOnReply(!onReply)}>
                  {onReply ? '- Cancel -' : '- Reply -'}
                </small>

                <small className="d-flex">
                  <div className="comment_nav">
                    {
                      comment.blogUserId === auth.user?.id ?
                        (comment.user.id === auth.user.id ? Nav(comment) : <i className="fas fa-trash-alt mx-2" onClick={() => console.log("TODO: handleDelete")} />)
                        : comment.user.id === auth.user?.id && Nav(comment)
                    }
                  </div>
                  <div>
                    { new Date(comment.createdAt).toLocaleString() }
                  </div>
                </small>
              </div>
            </div>
          )
        }
        {
          onReply && <Input callback={handleComment} />
        }
      </div>

      {
        replies.length > 0 && (
          <div className="my-3 d-flex" 
            style={{ opacity: comment.id ? 1 : 0.5, pointerEvents: comment.id ? 'initial' : 'none' }}
          >
            {replies.map((reply) => (
              <Comments key={reply.id} comment={reply} replies={[]} parentId={comment.id} handleComment={handleComment}  />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Comments;
