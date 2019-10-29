import React from 'react'
import ImageUploader from 'react-images-upload'

const ArticleFormInput = () => {
  return (
    <div id="article-form">
      <input name="title" id="title-input" onBlur={props.inputHandler} />
      <input name="content" id="content-input" onBlur={props.inputHandler} />

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

      <button id="submit-article" onClick={props.submitArticleHandler}>Submit Article</button>
    </div>
  )
}

export default ArticleFormInput