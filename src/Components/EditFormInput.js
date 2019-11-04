import React from 'react'
import ImageUploader from 'react-images-upload'

const EditFormInput = (props) => {
  return (
    <div id="edit-form">
      <input name="title" id="edit-title" onChange={props.editHandler} />
      <input name="content" id="edit-content" onChange={props.editHandler} />

      <ImageUploader
        buttonText={"Upload article image (jpg/png)"}
        withPreview
        withIcon
        withLabel={false}
        onChange={props.onAvatarDropHandler}
        imgExtension={[".jpg", ".png"]}
        maxFileSize={5242880}
        singleImage={true}
      />

      <button id="submit-change" onClick={props.submitChangeHandler}>Submit Article</button>
    </div>
  )
}

export default EditFormInput