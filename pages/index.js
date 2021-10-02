import { useState, useEffect } from 'react'
import styles from '../styles/Layout.module.sass'
import Head from 'next/head'
import Card from '../components/Card'
import DragDrop from '../components/DragDrop'
import { server } from '../config'

export default function Home({ posts }) {
  const [photos, setPhotos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [page, setPage] = useState(1) 
  const [size, setSize] = useState(9)   // default 9 photos/page

  useEffect(() => {
      onHome()
  },[])

  const onRefresh = async (tot_photos) => {
    let auto_page = Math.ceil(tot_photos/size)
    const res = await fetch(server + '/api/posts?' + new URLSearchParams({
       page: auto_page,
       size: size,
    }))
  
    const posts = await res.json()
    
    if(posts.photos.length > 0) {
      setTitle(posts.title)
      setDescription(posts.description)
      setPhotos(posts.photos)
      setPage(auto_page)
    }
  
  }

  const onNext = async () => {
    const res = await fetch(server + '/api/posts?' + new URLSearchParams({
       page: (page + 1),
       size: size,
    }))
  
    const posts = await res.json()
    if(posts.photos.length > 0) {
      setTitle(posts.title)
      setDescription(posts.description)
      setPhotos(posts.photos)
      setPage(page + 1)
    }
  
  }

  const onBack = async () => {
    if(page > 1) {
      const res = await fetch(server + '/api/posts?' + new URLSearchParams({
        page: (page - 1),
        size: size,
      }))
   
      const posts = await res.json()
      if(posts.photos.length > 0) {
        setTitle(posts.title)
        setDescription(posts.description)
        setPhotos(posts.photos)
        setPage(page - 1)
      }
    }
  }

  const onHome = async () => {
    const res = await fetch(server + '/api/posts?' + new URLSearchParams({
      page: 1,
      size: size,
    }))
 
    const posts = await res.json()
    
    if(posts.photos.length > 0) {
      setTitle(posts.title)
      setDescription(posts.description)
      setPhotos(posts.photos)
      setPage(1)
    }
  }

  const onDelete =  async () => {
    const res = await fetch(server + '/api/posts', {
      method: 'DELETE',
    }) 

    if(res.status === 200) {
      setTitle('')
      setDescription('')
      setPhotos([])
      setPage(1)
    }
  }

  return (
    <div>
      <Head>
        <title> Resturant </title>
        <meta name='keywords' content='resturant, kitchen' /> 
      </Head>
      <div className={styles.grid}>
        <div className={styles.card}>
          <DragDrop onDelete={onDelete} onRefresh={onRefresh}/>
        </div>
        
        <Card title={title} description={description} photos={photos} onNext={onNext} onBack={onBack} onHome={onHome}></Card>
      </div>
    </div>
  )
}

