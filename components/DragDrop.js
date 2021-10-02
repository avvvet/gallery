import { useState, useEffect } from 'react'
import styles from '../styles/DragDrop.module.sass'
import { server } from '../config'

const DragDrop = ({onDelete, onRefresh}) => {
  const [title, SetTitle] = useState('Photo Gallery')
  const [description, setDescription] = useState('A selection of the latest photos from our esturant and some of our favourites dishes.')
  
  const dropHanler = (e) => {
    e.preventDefault();
    if(e.dataTransfer.items) {
    let formData = new FormData();
    
      for(var i = 0; i < e.dataTransfer.items.length; i++) {
        ;((n) => {
          if(e.dataTransfer.items[n].kind === 'file') {
            formData.append('file', e.dataTransfer.items[n].getAsFile())
          }
        })(i)
      }
      uploadFile(formData)
    } else {
      for(var i = 0; i < e.dataTransfer.files.length; i++) {
        ;((n) => {
          if(e.dataTransfer.files[n].kind === 'file') {
            var file = e.dataTransfer.files[n];
            uploadFile(file)
          }
        })(i)
      }
    }
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
  }

  const uploadFile = async (file) => {
    const res = await fetch(server + '/api/posts?' + new URLSearchParams({
        title: title,
        description: description,
    }), {
        method: 'POST',
        body: file
    })

    const posts = await res.json()
    if(posts.photos.length > 0)  onRefresh(posts.photos.length)
  }

  return (
      <div>
        <input type="text" name="title" value={title} className={styles.title} onChange={e => SetTitle(e.target.value)}/>
        <textarea name="description" value={description} className={styles.description} onChange={e => setDescription(e.target.value)}/>
        <div onDrop={e => dropHanler(e)} onDragOver={e => dragOverHandler(e)} className={styles.dropzone}> 
            Drag phots here
        </div>
        <input type="button" name="btn" value='Delete ALL photos' className={styles.btndelete} onClick={e => onDelete(e)}/>
      </div>
    )
}

export default DragDrop