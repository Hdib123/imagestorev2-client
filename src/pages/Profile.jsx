import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import useForm from "../useForm";


function Profile({ user, setUser }) {
    const [chosenPicture, setChosenPicture] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [loaded, setLoad] = useState(false);
    const [search, setSearch] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [form, handleChange, handleSubmit] = useForm({
        tag: "",
        description: "",
      });


  function handleFormSubmission(event) {
    event.preventDefault();
    console.log(form)
    if (!chosenPicture) {
      console.log(
        "You need to pick an image before submitting the form"
      );
      return;
    }

    const formBody = new window.FormData();
/*    const formData = {
    url: formBody,
    description: form.description,
        tag: form.tag,
    }*/
    formBody.append("profilePic", chosenPicture);
formBody.append("tag", form.tag)
formBody.append("description", form.description)

    axios.post(
        `${process.env.REACT_APP_SERVER_URL}/uploadPicture`,
        formBody, {
            headers: {
                authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN)
            }
        }
      )
      .then((res) => {
        console.log("message from the Backend", res);

        // setUser({ ...user, profilePic: res.data.picFromServer });
      })
      .catch((err) => console.log(err.response));
  }

  function handleInputChange(event) {
    const image = event.target.files[0];

    setChosenPicture(image);
  }



useEffect(() => {
    const url = `http://localhost:5005/api/profile/${user._id}`;
    axios.get(url, {headers: { authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN) }}).then(response => {
        
        console.log(response.data)
        setPictures(response.data.response)
        setLoad(true)
        //console.log(pictures)
    }).catch(e => {
        console.log(e)
    })
},[] )

const handleClick = (e) => {
    if(e.target.classList.contains('backdrop')){
    setSelectedImage(null);
}}


const filteredPictures = pictures.filter(picture =>{
    return picture.tag.toLowerCase().includes(search.toLowerCase())
})


  return (
    <div>
      <h1>Your gallery profile</h1>
      <h2>Upload a new image !</h2>
      
        
      <form onSubmit={handleFormSubmission}>
        <input className="custom-file-input" type="file" onChange={handleInputChange}/>
        <br/>
        <input className="inputfield" type="text" onChange={handleChange} name="tag" value={form.tag} placeholder="Add a single tag"/>
        <input className="inputfield" type="text" onChange={handleChange} name="description" value={form.description} placeholder="Add a description"/>
        <button className="button" type="submit">Upload Picture! </button>
        {search}
        <br/>
        <h2>Search for an existing Image</h2>
        <input className="searchbar" type="text" placeholder="Search for specific tags" onChange={ e => setSearch(e.target.value)}/>
      </form>
      <div className="img-grid">
      {
          loaded && filteredPictures.map(p => 
             <div className="img-wrap" onClick={() => setSelectedImage(p.url)}>
                <img className="picture" src={p.url} alt={p.tag}/>
                {/* <p><b>Tag:</b> {p.tag}</p> */}
                <p className="description"><b>Description:</b> {p.description}</p>
             </div>

        )
      }
      </div>
      {selectedImage && <div className="backdrop" onClick={handleClick}>
          <img src={selectedImage} alt="modal"></img>
      </div>}
    </div>
  );
}

export default Profile;