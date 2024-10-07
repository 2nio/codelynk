import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import './CSS/Component.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IoCopyOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import TopNav from './TopNav';
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';


// Extract component id from URL
const url = new URL(window.location.href)
const componentId = url?.pathname.split('/').pop()

const codeStyle = {
  height: '36vh',
  padding: '16px',
  display: 'flex',
  margin: '0px',
  borderBottomRightRadius: '10px',
  borderBottomLeftRadius: '10px',
  fontSize: '17px',
  display: 'flex',
  alignItems: 'flex-start'
}

export default function Component() {

  const [inputComment, setInputComment] = useState()
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const { data: user, loading: loadingUser, fetchData: fetchUser } = useFetch('user')
  const { data: component, loading: loadingComponent, fetchData: fetchComponent } = useFetch(`post/${componentId}`)
  const { postData: editPost, loading: loadingEditPost } = usePost('edit')

  function timeOut(myFunction) {
    myFunction(true)
    setTimeout(() => {
      myFunction(false)
    }, 8000);
  }

  function handleEdit() {
    window.location.href = `http://localhost:3000/create/${component._id}`
  }

  if (loadingComponent) return (
    <>
      <TopNav />
      <div className='Components_div_main'>
        Loading...
      </div>
    </>
  )

  return (
    <>
      <TopNav sendSearch={search => navigate(`/`, { state: { search } })} />
      <div className='Components_div_main'>
        <div className='Component_div_image'>
          {component && <img src={component?.image.url} />}

          {component?.description && <div className='Component_div_desc'>
            <div className='Component_div_commentsMenu'>
              <p>Description</p>
            </div>
            <p className='Component_p_desc'>{component?.description}</p>
          </div>}
        </div>
{/*           <div className='Component_div_code'>
            <div className='Component_div_codeMenu'>
              <p>{'</>'}</p>
              <div className='Component_div_codeMenuRight'>
                {copied ?
                  <p>Copied</p>
                  :
                  <IoCopyOutline
                    className='Component_icon_copyCode'
                    onClick={e => {
                      navigator.clipboard.writeText(component?.code)
                      timeOut(setCopied)
                    }} style={{ marginRight: '14px' }} size={'1.3rem'} />
                }
                {component?.creator === user?.username && <FiEdit3 onClick={handleEdit} style={{ marginRight: '14px' }} size={'1.2rem'} />}
                <LuHeart fill={component?.likes.includes(user?.username) && 'red'} color={component?.likes.includes(user?.username) && 'red'}
                  onClick={e => editPost({
                    id: component?._id,
                    action: component?.likes.includes(user?.username) ? 'unlike' : 'like',
                    user: user?.username
                  }, fetchComponent)} className='Component_icon_likeCode' style={{ marginRight: '6px' }} size={'1.3rem'} />
                {component?.likes.length > 0 && <p style={{ fontWeight: '300', fontSize: '15px' }}>{component?.likes.length}</p>}
              </div>
            </div>

            <SyntaxHighlighter language="javascript" customStyle={codeStyle} style={atomOneDark} wrapLongLines={true}>
              {component?.code}
            </SyntaxHighlighter>
          </div>
 */}
          <div className='Component_div_comments'>
            <div className='Component_div_commentsMenu'>
              <p>Comments</p>
            </div>
            <div className='Component_div_allComments'>
              {
                component?.comments.slice(0).reverse().map(comment => (
                  <div className='Component_div_userComment'>
                    <div className='Component_div_userPfp'><FaRegUser /></div>
                    <div className='Component_div_userNameComm'>
                      <div className='Component_div_userName'>@{comment.user}</div>
                      <div className='Component_div_userComm'>{comment.body}</div>
                    </div>
                    {
                      user?.username === comment.user &&
                      <button className='Component_button_deleteComment' type='button'>
                        <MdDeleteOutline style={{ color: '#a4a4a4' }} size={'1.3rem'}
                          onClick={e => editPost({ id: componentId, action: 'delete comment', commentId: comment._id }, fetchComponent)} />
                      </button>
                    }
                  </div>
                ))
              }
            </div>
            {
              user?.username
              &&
              <div className='Component_div_postComment'>
                <input onChange={(e) => setInputComment(e.target.value)} value={inputComment} type='text' placeholder='Comment' />
                <button type='button'><RiSendPlaneLine size={'1.2rem'}
                  onClick={e => inputComment && editPost({
                    id: componentId,
                    commentDetails: { body: inputComment, user: user?.username, date: new Date() }
                  }, fetchComponent)} /></button>
              </div>
            }
          </div>
        </div>
    </>
  )
}
