import React from 'react'
import { useNavigate } from "react-router-dom";
import './CSS/Home.css'
import TopNav from './TopNav';
import { FaRegUser } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';

function LikedComp() {

    const { data: user, loading: loadingUser, fetchData: fetchUser } = useFetch('user')
    const { postData: editPost, loading: loadingEditPost } = usePost('edit')
    const navigate = useNavigate()

    return (
        <>
            <TopNav sendSearch={search => navigate(`/`, { state: { search } })} />

            <div className='div_main'>
                {
                    user?.likedComponents.map(component => (
                        <div className={component.likes.includes(user?._id) ? 'div_component' : 'hidden'}>
                            <div className='div_image'
                                onClick={e => window.location.href = `http://localhost:3000/component/${component._id}`}>
                                <img src={component.image.url} />
                            </div>
                            <div className='div_bottomSide'>
                                <div className='div_userPf'>
                                    <div className='div_userImage'><FaRegUser size={'0.9rem'} /></div>
                                    <p className={'div_text'}>@{component.creator}</p>
                                </div>
                                <div className='div_compLikes'>
                                    <LuHeart fill={component.likes.includes(user?._id) && 'red'} color={component.likes.includes(user?._id) && 'red'}
                                        onClick={e => editPost({
                                            id: component._id,
                                            action: component.likes.includes(user?._id) ? 'unlike' : 'like',
                                            user: user?._id
                                        }, fetchUser)} className='Component_icon_likeCode' style={{ marginRight: '6px' }} size={'1.1rem'} />
                                    {component.likes.length > 0 && <p style={{ fontSize: '14px' }}>{component.likes.length}</p>}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default LikedComp