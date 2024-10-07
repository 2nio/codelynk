import React, { useState } from 'react'
import TopNav from './TopNav'
import CodeIDE from './CodeIDE'
import './CSS/CreateComp.css'
import axios from 'axios'
import { GoPlus } from "react-icons/go";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function CreateComponent() {

    const [code, setCode] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [username, setUsername] = useState()
    const [invalidFields, setInvalidFields] = useState(false)
    const [image, setImage] = useState()
    const [editMode, setEditMode] = useState(false)
    const [imageChanged, setImageChanged] = useState(false)


    function childToParent(childData) {
        setCode(childData)
    }

    function handlePostComponent() {
        if (code && title && image) {
            axios.post('http://localhost:3001/add', { title, description, code, creator: username, image })
                .then(result => window.location.href = 'http://localhost:3000')
                .catch(err => console.log('Error: ' + err))
        } else timeOut(setInvalidFields)
    }

    function timeOut(myFunction) {
        myFunction(true)
        setTimeout(() => {
            myFunction(false)
        }, 6000);
    }

    function handleImage(image) {
        if (image) {
            setImageChanged(true)
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onloadend = () => {
                setImage(reader.result)
            }
            console.log(image)
        } else return 0
    }

    // Extract id from url
    const url = new URL(window.location.href)
    const componentId = url.pathname.split('/').pop()

    function handleEditMode(user) {
        if (window.location.pathname !== '/create') {
            axios.get(`http://localhost:3001/get/${componentId}`)
                .then(result => {
                    if (!result.data.title) { window.location.href = 'http://localhost:3000' }
                    else if (result.data.creator !== user) { window.location.href = 'http://localhost:3000' }
                    else {
                        setCode(result.data.code)
                        setTitle(result.data.title)
                        setDescription(result.data.description)
                        setImage(result.data.image.url)
                        setEditMode(true)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    function handleEditComponent() {
        if (code && title && image) {
            axios.put(`http://localhost:3001/add/${componentId}`, { title, description, code, creator: username, image, imageChanged })
                .then(result => window.location.href = 'http://localhost:3000')
                .catch(err => console.log('Error: ' + err))
        } else timeOut(setInvalidFields)
    }

    function handleDeleteComp() {
        axios.delete(`http://localhost:3001/add/${componentId}`)
            .then(result => window.location.href = 'http://localhost:3000')
            .catch(err => console.log('Error: ' + err))
    }

    return (
        <>
            <TopNav />
            <div className='div_main' style={{ alignItems: 'stretch' }}>
                <CodeIDE childToParent={childToParent} code={code} />

                <div className='CreateComp_div_rightSide'>
                    <div className='CreateComp_div_image'>
                        <form className='CreateComp_form_uploadImage' onClick={e => document.querySelector('.CreateComp_input_uploadImage').click()}>
                            <input onChange={(e) => {
                                handleImage(e.target.files[0])
                            }} accept='image/*' className='CreateComp_input_uploadImage' hidden type='file' />
                            {image ?
                                <img src={image} /> :
                                <MdOutlineAddPhotoAlternate color='#424242' size={'4rem'} />
                            }
                        </form>
                    </div>
                    <input defaultValue={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Title' className='CreateComp_input_title' />
                    <textarea defaultValue={description} onChange={e => setDescription(e.target.value)} type='text' placeholder='Description' className='CreateComp_textarea_description' />
                    <div className='CreateComp_div_post'>
                        {invalidFields && <p>Fill in code and title</p>}
                        {username &&
                            <button onClick={editMode ? handleEditComponent : handlePostComponent} className='CreateComp_button_post' type='button'>
                                <GoPlus size={'1rem'} />&nbsp;{editMode ? 'Update' : 'Create'}
                            </button>}
                        {editMode && <button onClick={handleDeleteComp} className='CreateComp_button_delete'><MdDeleteOutline size={'1rem'} />&nbsp;Delete</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateComponent