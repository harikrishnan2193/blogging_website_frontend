import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';

function ReadBlog() {

  const blog = useSelector(state => state.blog.selectedBlog)
  const navigate = useNavigate()

  if (!blog) {
    navigate('/')
    return null;
  }

  return (
    <>
      <div className='content-padding py-5'>
        <div className="border p-5 mb-5 shadow-sm">

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
          </div>

          <h3 className="card-heading fw-bold">{blog.title}</h3>

          <p className="fs-5 text-dark">{blog.subHead}</p>

          <img
            src={`${BASE_URL}/uploads/${blog.blogImage}`}
            alt="Blog Visual"
            className="img-fluid mt-3"
          />

          <p className="blog-content-text fs-7 text-dark py-4">
            {blog.content}
          </p>
        </div>
      </div>
    </>
  )
}

export default ReadBlog
