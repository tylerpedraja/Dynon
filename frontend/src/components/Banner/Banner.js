import React from 'react'
import '../Banner/banner.css'


const Banner = (props) => {
  return (
        <div className="banner py-5 text-white text-center">
            <h1>{props.title}</h1>
            <h4>{props.subtitle}</h4>
        </div>
  )
}

export default Banner