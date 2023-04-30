import React, { useEffect, useState } from 'react'
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: ""
}
const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"]

export const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState)
    const [categoryErrMsg, setCategoryErrMsg] = useState(null)
    const [titleErrMsg, setTitleErrMsg] = useState(null)
    const [descriptionErrMsg, setDesriptionErrMsg] = useState(null)
    const [imageErrMsg, setImageErrMsg] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const { title, description, category, imageUrl } = formValue
    const navigate = useNavigate()

    const { id } = useParams()
    useEffect(() => {
        if (id) {
            setEditMode(true)
            getSingleBlog(id)
        } else {
            setEditMode(false)
            setFormValue({ ...initialState })
        }
    }, [id])
    const getSingleBlog = async (id) => {
        const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`)
        if (singleBlog.status === 200) {
            setFormValue({ ...singleBlog.data })
        }
        else {
            toast.error("Somthing wents wrong")
        }
    }

    const getDate = () => {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, "0")
        let mm = String(today.getMonth() + 1).padStart(2, "0")
        let yyyy = today.getFullYear()
        today = mm + "/" + dd + "/" + yyyy
        return today

    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        if (!category) {
            setCategoryErrMsg("Please select a category")
        }
        if (!title) {
            setTitleErrMsg("Please Provide a Title")
        }
        if (!description) {
            setDesriptionErrMsg("Please Provide a Description")
        }
        if (!imageUrl) {
            setImageErrMsg("Please Provide a Image")
        }
        const imageValidation =!editMode ?imageUrl: true
        if (title && description && category && imageUrl) {
            const currentdate = getDate()
            if (!editMode) {
                const updateBlogdate = ({ ...formValue, date: currentdate });
                const response = await axios.post("http://localhost:5000/blogs", updateBlogdate)
                if (response.status === 201) {
                    toast.success("Blog Create Succesfully")
                } else {
                    toast.error("Somthing wents wrong")
                }
            } else {
                const response = await axios.put(`http://localhost:5000/blogs/${id}`, formValue)
                if (response.status === 200) {
                    toast.success("Blog Updated Succesfully")
                } else {
                    toast.error("Somthing wents wrong")
                }
            }

            setFormValue({ title: "", description: "", category: "", imageUrl: "" })
            navigate("/")
        }
    }
    const onInputChange = (e) => {
        setTitleErrMsg(null)
        setDesriptionErrMsg(null)
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    const onUploadImage = (file) => {
        setImageErrMsg(null)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "p5jmjvyc")
        axios.post("http://api.cloudinary.com/v1_1/dpzhrid2e/image/upload", formData)
            .then((resp) => {
                toast.info("Image uploaded Successfully")
                setFormValue({ ...formValue, imageUrl: resp.data.url })
            }).catch((err) => {
                toast.error("Somthing wents wrong")
            })
    }
    const onCategoryChange = (e) => {
        setCategoryErrMsg(null)
        setFormValue({ ...formValue, category: e.target.value })

    }
    return (
        <MDBValidation className='row g-3' noValidate onSubmit={handelSubmit} style={{ marginTop: "100px" }}>
            <p className='fs-2 fw-bold'>{editMode ? " Update Blog" : " Add Blog"}</p>
            <div style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"

            }}>
                <MDBInput
                    value={title || ""}
                    name='title'
                    type='text'
                    onChange={onInputChange}
                    required
                    label="title"
                    invalid
                />
                {titleErrMsg && (
                    <div className="categoryerr">{titleErrMsg}</div>
                )}
                <br />
                <MDBTextArea
                    value={description || ""}
                    name='description'
                    type='textarea'
                    onChange={onInputChange}
                    required
                    label="description"
                    invalid={MDBInput.invalid}
                />
                {descriptionErrMsg && (
                    <div className="categoryerr">{descriptionErrMsg}</div>
                )}
                <br />
                {!editMode && (
                    <>
                        <MDBInput
                            type='file'
                            onChange={(e) => onUploadImage(e.target.files[0])}
                            required
                            invalid
                        />
                        {imageErrMsg && (
                            <div className="categoryerr">{imageErrMsg}</div>
                        )}
                        <br />
                    </>
                )}

                <select
                    className='categoryDropDown'
                    onChange={onCategoryChange}
                    value={category}
                >
                    <option value="">Please select category</option>
                    {options.map((option, index) => (
                        <option value={option || ""} key={index}>
                            {option}
                        </option>
                    ))}
                </select>
                {categoryErrMsg && (
                    <div className="categoryerr">{categoryErrMsg}</div>
                )}
                <br />
                <br />
                <MDBBtn type='submit' style={{ marginRight: "10px" }}> {editMode ? "Update" : "Add"} </MDBBtn>
                <MDBBtn color='danger' style={{ marginRight: "10px" }} onClick={() => navigate("/")}> Go Back</MDBBtn>

            </div>
        </MDBValidation>
    )
}
