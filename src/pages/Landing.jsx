import React, { useEffect, useState } from 'react'
import { getAllblogsAPI } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';

function Landing() {

    const [allBlogs, setAllBlogs] = useState([])

    //get all blogs
    const getAllBlogs = async () => {
        try {
            const response = await getAllblogsAPI();
            if (response.status === 200) {
                console.log("Fetched blogs:", response.data);
                setAllBlogs(response.data);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        getAllBlogs()
    }, [])

    return (
        <>
            <div
                className="landing-content d-flex align-items-top justify-content-center text-white"
                style={{
                    backgroundImage: `url('https://static.wixstatic.com/media/baac51_d623fe1790ed419a89d20aa05f6064b2.jpg/v1/fill/w_1901,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/baac51_d623fe1790ed419a89d20aa05f6064b2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: '70vh',
                    position: 'relative',
                }}
            >
                <div className="container text-center">
                    <h3 className="text-heading text-dark pt-5">CRAFTED WITH PURPOSE,<span className='fw-light'> INSPIRED</span> BY STYLE</h3>
                </div>
            </div>

            <div className="card-heading text-center pt-5 d-flex justify-content-center alighn-items-center">
                <h2>All Blogs</h2>
            </div>

            {allBlogs.length > 0 ? (
                allBlogs.map((blog, index) => (
                    <div className="card-content content-padding py-5">
                        <div className="row shadow-sm border overflow-hidden">
                            {/* left */}
                            <div className="col-md-6 p-0">
                                <img
                                    src={`${BASE_URL}/uploads/${blog.blogImage}`}
                                    alt="No image"
                                    className="img-fluid w-100 h-100 object-fit-cover"
                                    style={{ objectFit: 'cover', height: '100%' }}
                                />
                            </div>

                            {/* right */}
                            <div className="col-md-6 p-5 d-flex flex-column justify-content-between">
                                <div className='pb-4'>
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                            className="rounded-circle me-2"
                                            alt="Admin"
                                            width="40"
                                            height="40"
                                        />
                                        <div>
                                            <small className="text-muted">{blog.userName}</small><br />
                                            <small className="text-muted">{new Date(blog.updatedAt).toLocaleString()}</small>
                                        </div>
                                    </div>

                                    <h5 className="blog-text fw-bold">{blog.title}</h5>
                                    <p className="text-muted">
                                        {blog.subHead.length > 200
                                            ? <>
                                                {blog.subHead.slice(0, 200)}...
                                                <span style={{ color: 'blue', cursor: 'pointer' }}> Read more</span>
                                            </>
                                            : blog.subHead}
                                    </p>

                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                    {/* <div>
                                        <small className="text-muted me-3">0 views</small>
                                        <small className="text-muted">0 comments</small>
                                    </div>
                                    <div>
                                        <small className="text-muted me-1">42</small>
                                        <i className="bi bi-heart text-danger"></i>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='fw-bold content-padding py-3'>No blogs currently found</p>
            )

            }

        </>

    )
}

export default Landing