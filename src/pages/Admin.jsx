import React, { useEffect, useState } from 'react'
import { addBlogAPI, deleteBlogAPI, getUsersBlogAPI, updateBlogAPI } from '../services/allApi'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../services/baseUrl'

function Admin() {

    const [editMode, setEditMode] = useState(false)
    const [editingBlogId, setEditingBlogId] = useState(null)

    const isLoggedInRedux = useSelector((state) => state.auth.loggedIn)
    const [allUserBlog, setAllUserBlog] = useState([])
    const [token, setToken] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [imgPreview, setImgPreview] = useState("")
    const [product, setProduct] = useState({
        title: '',
        subHead: '',
        content: '',
        blogImage: '',
        userName: ''
    })

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))

        }
        const userDetails = sessionStorage.getItem("userDetils");
        if (userDetails) {
            const parsedDetails = JSON.parse(userDetails)
            setProduct(prev => ({
                ...prev,
                userName: parsedDetails.name
            }))
        }
    }, [])

    //set image url
    useEffect(() => {
        if (product.blogImage) {
            setImgPreview(URL.createObjectURL(product.blogImage))
        }
    }, [product.blogImage])

    //function to add bloggs
    const handlePublish = async (e) => {
        e.preventDefault()
        if (!token) return Swal.fire('Not authorized')

        const { title, subHead, content, blogImage, userName } = product
        if (!title || !subHead || !content || !blogImage) {
            return Swal.fire('Please fill all fields')
        }

        const reqBody = new FormData()
        reqBody.append('title', title)
        reqBody.append('subHead', subHead)
        reqBody.append('content', content)
        reqBody.append('blogImage', blogImage)
        reqBody.append('userName', userName)

        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        };

        const result = await addBlogAPI(reqBody, reqHeader)
        if (result.status === 200) {
            Swal.fire('Blog posted successfully')
            setShowModal(false)
            setProduct({ title: "", subHead: "", content: "", blogImage: "" })
            setImgPreview("")
            getAllUserBlogs()
        } else {
            Swal.fire(result.response?.data?.message || 'Failed')
        }
    }

    //function to get all users blogs
    const getAllUserBlogs = async () => {
        const userDetailsString = sessionStorage.getItem("userDetils")

        if (userDetailsString) {
            const userDetails = JSON.parse(userDetailsString)
            const userId = userDetails._id
            // console.log(userId)

            try {
                const response = await getUsersBlogAPI(userId)
                if (response.status === 200) {
                    setAllUserBlog(response.data)
                } else {
                    console.error("Failed to fetch blogs")
                }
            } catch (error) {
                console.error("Error fetching blogs:", error)
            }
        } else {
            console.warn("No user details found. Cannot fetch blogs.")
        }
    }

    //edit blog
    const handleEdit = (blog) => {
        setProduct({
            title: blog.title,
            subHead: blog.subHead,
            content: blog.content,
            blogImage: "",
            userName: blog.userName
        });
        setImgPreview(`${BASE_URL}/uploads/${blog.blogImage}`)
        setEditMode(true)
        setEditingBlogId(blog._id)
        setShowModal(true)
    }

    //update blogs
    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!token || !editingBlogId) return Swal.fire('Not authorized')

        const { title, subHead, content, blogImage, userName } = product
        if (!title || !subHead || !content) {
            return Swal.fire('Please fill all fields')
        }

        const reqBody = new FormData()
        reqBody.append('title', title)
        reqBody.append('subHead', subHead)
        reqBody.append('content', content)
        if (blogImage) reqBody.append('blogImage', blogImage)
        reqBody.append('userName', userName)

        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }

        const result = await updateBlogAPI(editingBlogId, reqBody, reqHeader)
        if (result.status === 200) {
            Swal.fire('Blog updated successfully')
            setShowModal(false);
            setProduct({ title: "", subHead: "", content: "", blogImage: "" })
            setImgPreview("")
            setEditMode(false)
            setEditingBlogId(null)
            getAllUserBlogs()
        } else {
            Swal.fire(result.response?.data?.message || 'Failed to update')
        }
    }

    //delete a blog
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this blog?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        })

        if (!result.isConfirmed) return

        try {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const response = await deleteBlogAPI(id, reqHeader)

            if (response.status === 200) {
                Swal.fire('Blog deleted successfully')
                getAllUserBlogs()
            } else {
                Swal.fire('Failed to delete blog')
            }
        } catch (error) {
            console.error('Delete Error:', error)
            alert('Error deleting blog')
        }
    }

    //close modal
    const handleClose = () => {
        setProduct({
            title: '',
            subHead: '',
            content: '',
            blogImage: '',
            userName: ''
        })
        setImgPreview('')
        setEditMode(false)
        setShowModal(false)
    }


    useEffect(() => {
        getAllUserBlogs()
    }, [isLoggedInRedux])

    return (
        <>
            <div className="content-padding">
                <div className="d-flex flex-wrap gap-3 py-5">
                    <span className="text-primary fs-5 fw-semibold">
                        All Posts
                    </span>
                    <button onClick={() => setShowModal(true)} className="custom-tag-button">
                        Add New Blog
                    </button>
                </div>


                {/* card */}
                {allUserBlog.length > 0 ? (
                    [...allUserBlog].reverse().map((blog, index) => (
                        <div className="border p-5 mb-5 shadow-sm">
                            {/* admin info */}
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                        className="rounded-circle me-2"
                                        alt="Admin"
                                        width="40"
                                        height="40"
                                    />
                                    <small className="text-muted">
                                        {blog.userName} &nbsp;·&nbsp; {new Date(blog.updatedAt).toLocaleString()}
                                    </small>
                                </div>

                                <div className="blog-buttons d-flex gap-4">
                                    <i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(blog)}></i>
                                    <i className="fa-solid fa-trash" onClick={() => handleDelete(blog._id)}></i>
                                </div>
                            </div>

                            {/* heading */}
                            <h3 className="card-heading fw-bold">{blog.title}</h3>

                            <p className="fs-5 text-dark">
                                {blog.subHead}
                            </p>

                            <img
                                src={`${BASE_URL}/uploads/${blog.blogImage}`}
                                alt="No image"
                                className="img-fluid mt-3"
                            />
                            <p className="blog-content-text fs-7 text-dark py-4">
                                {blog.content}
                            </p>
                        </div>
                    ))
                )
                    : (
                        <p className='fw-bold'>No blogs currently found</p>
                    )
                }

                {/* model */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">New Blog</h5>
                                    <button type="button" className="btn-close" onClick={handleClose}></button>
                                </div>
                                <div className="modal-body row">
                                    <div className="col-12 mb-4">
                                        <label htmlFor="upload" className="d-block bg-primary bg-opacity-10 border border-primary rounded p-3 text-center cursor-pointer">
                                            <input
                                                id="upload"
                                                type="file"
                                                onChange={(e) => setProduct({ ...product, blogImage: e.target.files[0] })}
                                                style={{ display: "none" }}
                                            />
                                            <img
                                                src={imgPreview ? imgPreview : "https://cdn-icons-png.flaticon.com/512/1004/1004733.png"}
                                                className="mb-2"
                                                alt="Upload icon"
                                                width="200"
                                                height="150"
                                            />
                                            <p className="mb-0 text-primary">Click here to upload an image</p>
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} type="text" className="form-control" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Subtitle</label>
                                            <input value={product.subHead} onChange={(e) => setProduct({ ...product, subHead: e.target.value })} type="text" className="form-control" placeholder="Enter subtitle" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Content</label>
                                            <textarea value={product.content} onChange={(e) => setProduct({ ...product, content: e.target.value })} className="form-control" rows="4" placeholder="Write blog content here..."></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                    {!editMode ? (
                                        <button onClick={handlePublish} type="button" className="btn btn-primary">Publish</button>
                                    ) : (
                                        <button onClick={handleUpdate} type="button" className="btn btn-success">Update</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Admin