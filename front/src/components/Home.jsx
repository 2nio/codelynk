import { React, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import './CSS/Home.css'
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';
import TopNav from './TopNav';
import { FaRegUser } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";

function Home() {
  //State sent from search input on other page than home
  const location = useLocation()
  const search = location.state?.search

  const { data: components, loading: loadingComponents, fetchData: fetchComponents } = useFetch('allPosts', { search: search || '' })
  const { data: user, loading: loadingUser, fetchData: fetchUser } = useFetch('user')
  const { postData: editPost, loading: loadingEditPost } = usePost('edit')

  //Clear location state on page reload
  useEffect(() => {
    window.addEventListener("beforeunload", window.history.replaceState({ search }, ''));
    return () => {
      window.removeEventListener("beforeunload", window.history.replaceState({ search }, ''));
    };
  }, []);

  return (
    <>
      <TopNav sendSearch={search => fetchComponents({ search })} />

      <div className='div_main'>
        {
          components?.map(component => (
            <div className='div_component'>
              <div className='div_image'
                onClick={e => window.location.href = `http://localhost:3000/component/${component._id}`}>
                <img src={component.image.url} />
              </div>
              <div className='div_bottomSide'>
                <div className='div_userPf'>
                  <div className='div_userImage'><FaRegUser size={'0.8rem'} /></div>
                  <p className='div_text'>@{component.creator}</p>
                </div>
                <div className='div_compLikes'>
                  <LuHeart fill={component.likes.includes(user?._id) && 'red'} color={component.likes.includes(user?._id) && 'red'}
                    onClick={e => editPost({
                      id: component._id,
                      action: component.likes.includes(user?._id) ? 'unlike' : 'like',
                      user: user?._id
                    }, fetchComponents)} className='Component_icon_likeCode' style={{ marginRight: '6px' }} size={'1rem'} />
                  {component.likes.length > 0 && <p style={{ fontSize: '13px', fontWeight: '500' }}>{component.likes.length}</p>}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home