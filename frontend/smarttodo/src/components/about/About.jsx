import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className='about d-flex flex-column justify-content-center align-items-center'>
      <div className='container'> 
        <div className='d-flex'>
          <h1>About Us</h1>
        </div>
        <p>
          Smart Todo is your personal task buddy—simple, smart, and always on time. We help you stay organized with reminders, priorities, and calendar sync, so you can focus on what matters most.
          <br/><br/>
          Our platform is built to make task management easy and stress-free. With features like smart scheduling, custom alerts, and a clean interface, staying productive feels effortless.
          <br/><br/>
          Whether you're a student or a working professional, Smart Todo is here to simplify your day and help you get things done—one smart task at a time.
        </p>
      </div>
    </div>
  )
}

export default About
