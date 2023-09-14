import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
    <h1>PageNotFound ^v^</h1>

    <h3>try this: <Link to="/"> HomePage</Link></h3>
    </div>
  )
}

export default PageNotFound