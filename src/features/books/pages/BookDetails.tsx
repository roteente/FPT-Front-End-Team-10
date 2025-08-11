import { useParams } from 'react-router-dom'
import { useGetBookQuery } from '@/features/books/bookApi'
import { Skeleton } from 'antd'
export default function BookDetails(){
  const id = Number(useParams().id)
  const { data, isLoading } = useGetBookQuery(id, { skip: !id })
  if (isLoading || !data) return <Skeleton active/>
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:24}}>
      <img src={data.images?.[0]} style={{width:'100%', borderRadius:8}}/>
      <div>
        <h2>{data.title}</h2>
        <div>Tác giả: <b>{data.author}</b></div>
        <div style={{margin:'8px 0'}}>Giá: <b>{(data.salePrice ?? data.price).toLocaleString()} ₫</b></div>
        <p>{data.description}</p>
      </div>
    </div>
  )
}
