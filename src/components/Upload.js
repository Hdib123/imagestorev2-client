import React, { useState } from "react";
import axios from "axios";

function Upload({ user, setUser }) {
  const [chosenPicture, setChosenPicture] = useState(null);

  function handleFormSubmission(event) {
    event.preventDefault();

    if (!chosenPicture) {
      console.log(
        "You need to pick an image before submitting the form, silly!"
      );
      return;
    }

    const formBody = new window.FormData();
    formBody.append("profilePic", chosenPicture);

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/uploadPicture/${user._id}`,
        formBody
      )
      .then((res) => {
        console.log(res);

        setUser({ ...user, profilePic: res.data.picFromServer });
      })
      .catch((err) => console.log(err.response));
  }

  function handleInputChange(event) {
    const image = event.target.files[0];

    setChosenPicture(image);
  }

  return (
    <div>
      <h1> Profile View </h1>
      <h2>Your profile picture below! </h2>
      <img src={user.profilePic} alt="user's profile" width="400" />

      <form onSubmit={handleFormSubmission}>
        <input type="file" onChange={handleInputChange} />
        <button type="submit">Upload Picture! </button>
      </form>
    </div>
  );
}

export default Upload;
