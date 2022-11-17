import React, { useState} from 'react'
// import './App.css'
import Navbar from './Component/Navbar'
import News from './Component/News'
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";

const App =()=> {
  const pageSize = 8;
  const country = 'in';
  const apiKey ="61afa71c884f4033abafb3cc5170239e"

  // const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

    return (
      <div>
      <Router>
        <Navbar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
      />
      
        <Routes>
            <Route exact path="/" element = {<News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize = {pageSize} country={country} category= "general"/>}/>
            <Route exact path="/general" element = {<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize = {pageSize} country={country} category= "general"/>}/>
            <Route exact path="/business" element = {<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize = {pageSize} country={country} category= "business"/>}/>
            <Route exact path="/entertainment" element = {<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize = {pageSize} country={country} category= "entertainment"/>}/>
            <Route exact path="/health" element = {<News setProgress={setProgress} apiKey={apiKey} key="helth" pageSize = {pageSize} country={country} category= "health"/>}/>
            <Route exact path="/sports" element = {<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize = {pageSize} country={country} category= "sports"/>}/>
            <Route exact path="/science" element = {<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize = {pageSize} country={country} category= "science"/>}/>
            {/* <Route exact path="/technology"element = {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize = {pageSize} country={country} category= "technology"/>}/> */}
           <Route exact path="/technology" element = {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize = {pageSize} country={country} category= "technology"/>}> </Route>
            
          </Routes>
        </Router>
      </div>
    )
}

export default App;