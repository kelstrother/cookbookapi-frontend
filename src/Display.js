import React from 'react'

const Display = (props) => {


const {cookbooks} = props
console.log(cookbooks)

const loaded = () => {
   return (
      <div style= {{ textAlign: "center" }}>
         {cookbooks.map((cookbook) => {
            // console.log(cookbook.title)
            return (
               <section key={ cookbook._id }>
                  <h1 className= 'cb-title'>{cookbook.title}</h1>
                  <h4 className= 'cb-year'>{cookbook.yearPublished}</h4>
                  <button onClick={() => {
                     props.selectCookbook(cookbook)
                     props.history.push('/edit')}}
                     className="update-btn">
                        Update
                  </button>
                  <button
                  onClick={() => {props.deleteCookbook(cookbook)}} 
                  className="delete-btn">
                     Remove
                  </button>
               </section>
            )
         })}
      </div>
   )
}

   const loading = <h1>Loading...</h1>
   return cookbooks.length > 0 ? loaded() : loading
}


export default Display
