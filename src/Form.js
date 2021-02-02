import React from 'react'

const Form = (props) => {
   const [formData, setFormData] = React.useState(props.cookbook)

   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleSubmit(formData)
      props.history.push('/')
   }

   const handleChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value})
   }
   return (
     <form onSubmit={handleSubmit}>
      <input
        style= {{ width: '90vw' }}
        type="text"
        placeholder="Type in Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        style= {{ width: '90vw' }}
        type="number"
        placeholder="Year"
        name="yearPublished"
        value={formData.yearPublished}
        onChange={handleChange}
      />
      <input type="submit" value={props.label} style= {{ width: "15vw" }} />
    </form>
  );
};

export default Form;
