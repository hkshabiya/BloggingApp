import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit'
import { Blog } from '../components/Blog'
import { Search } from '../components/Search'
import { Category } from '../components/Category'

export const Home = () => {
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"]


  useEffect(() => {
    loadBlogsData()
  }, [])

  const loadBlogsData = async () => {
    const response = await axios.get("http://localhost:5000/blogs")
    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error("Somthing wents Wrong")
    }
  }
  console.log(data);

  const handelDelete = async (id) => {
    if (window.confirm("Are you sure that wanted to delete that blog?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`)
      if (response.status === 200) {
        toast.success("Blog deleted Successfull")
        loadBlogsData()
      } else {
        toast.error("Somthing wents Wrong")
      }
    }
  }

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str
  }
  const onInputChange = (e) => {
    if(!e.target.value){
      loadBlogsData()
    }
    setSearchValue(e.target.value)
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`)
    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error("Somthing went Wrong")
    }

  }
  const handlecategory= async(category)=>{
    const response =await axios.get(`http://localhost:5000/blogs?category=${category}`)
    if(response.status === 200){
      setData(response.data)
    }else{
      toast.error("Sothing went wrong")
    }
  }

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch} />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row gy-3">
              {data && data.map((item, index) => {
                return <Blog
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handelDelete={handelDelete}
                />
              })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
              <Category options={options}  handlecategory={handlecategory}/>
        </MDBCol>
      </MDBRow>
    </>
  )
}
