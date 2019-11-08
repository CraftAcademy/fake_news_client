import React from 'react'
import ImageUploader from 'react-images-upload'

const ArticleFormInput = (props) => {
  return (
    <div id="article-form">
      <div>
        <select id="categories" name="category" onChange={props.inputHandler}>
          <option name="politics" value="Politics">Politics</option>
          <option name="economy" value="Economy">Economy</option>
          <option name="tech" value="Tech">Tech</option>
          <option name="lifestyle" value="Lifestyle">Lifestyle</option>
          <option name="sports" value="Sports">Sports</option>
          <option name="leisure" value="Leisure">Leisure</option>
        </select>
      </div>
      <input name="title" id="title-input" onChange={props.inputHandler} />
      <input name="content" id="content-input" onChange={props.inputHandler} />

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