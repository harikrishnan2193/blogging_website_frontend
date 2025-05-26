import React from 'react';

function About() {
  return (
    <section className="content-padding pb-5">
      <div className="container text-center mb-5">
        <h2 className="section-title">DESIGN <span className="fw-light">FOR</span> LIFE</h2>
      </div>

      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1665329006985-04f95dd59402?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsb2d8ZW58MHx8MHx8fDA%3D"
              alt="Blog image"
              className="img-fluid about-image"
            />
          </div>

          <div className="col-md-6">
            <div className='d-flex'>
              <i className="fa-solid fa-blog fs-3 me-2"></i>
              <h5 className="mb-0 fw-bold">Blogs<span className="text-info">Post</span></h5>
            </div>
            <p className="lead mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, quas, assumenda quam, beatae ea suscipit amet soluta delectus consectetur commodi eum dicta? Placeat quas eligendi expedita voluptas at laudantium ad!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, rem eveniet nostrum nulla quis maiores pariatur quos. Ipsam, eveniet modi. Id magnam dolores hic ratione animi ex ullam maxime reprehenderit?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;
