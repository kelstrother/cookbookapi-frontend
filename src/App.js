import './App.css'
import React from 'react'
import './index.css'
import { Route, Link, Switch } from 'react-router-dom'
import Form from './Form'
import Display from './Display'


function App() {

  const url = 'http://localhost:4000'

  // const [authors, setAuthors] = React.useState([])
  const [cookbooks, setCookbooks] = React.useState([])
  

  const emptyCookbook = {
    title: '',
    yearPublished: 0,
  }
  
  const [chosenCookbook, setChosenCookbook] = React.useState(emptyCookbook)

  const getCookbooks = () => {
    fetch(url + "/api/cookbooks")
    .then(response => response.json())
    .then(data => {
      setCookbooks(data)
    })
  }

  React.useEffect(() => {
    getCookbooks()
  }, [])

  const handleCreate = (newCookbook) => {
    console.log(newCookbook)
    fetch(url + "/api/cookbooks", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newCookbook)
    })
    .then(() => {
      getCookbooks()
    })
  }

  // SELECT A COOKBOOK
const selectCookbook = (cookbook) => {
  setChosenCookbook(cookbook)
 
}
//  console.log(chosenCookbook)

 const handleUpdate = (cookbook) => {
    fetch(url + "/api/cookbooks/" + cookbook._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },  
    body: JSON.stringify(cookbook)
  })
  .then(() => {
    getCookbooks()
  })
}

const deleteCookbook = (cookbook) => {
  fetch(url + "/api/cookbooks/" + cookbook._id, {
    method: 'delete'
  })
  .then(() => {
    getCookbooks()
  })
}

  return (
    <div className="App">
      <h1 className="app-title">Cookbook Creation</h1>
      <Link to='/create'>
        <button className="create-btn">Add a Cookbook</button>
      </Link>
      <Switch>
        <Route exact path='/' render={(rp) => <Display {...rp} cookbooks = { cookbooks } selectCookbook={selectCookbook} deleteCookbook= { deleteCookbook }/> }/> 
        <Route exact path="/create" render={(rp) => ( 
        <Form {...rp} label="create" cookbook={ emptyCookbook } handleSubmit={ handleCreate } />
        )}/>
        <Route exact path="/edit" render={(rp) => (
          <Form {...rp} label="update" cookbook={chosenCookbook} handleSubmit= { handleUpdate }/>
        )}/>

      </Switch>

    </div>
  );
}

export default App;
