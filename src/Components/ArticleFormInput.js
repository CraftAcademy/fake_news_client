import React from 'react'
import ImageUploader from 'react-images-upload'
import { Button, Input, TextArea, Form } from 'semantic-ui-react'

const ArticleFormInput = (props) => {
  return (
    <div id="article-wrapper">
      <h2>Create your article</h2>
      <Form id="article-form" size="small">
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
        <div>
          <Input fluid name="title" id="title-input" placeholder="Title" onChange={props.inputHandler} />
        </div>
        <div>
          <TextArea style={{ minHeight: 200 }} name="content" id="content-input" placeholder="Content" onChange={props.inputHandler} />
        </div>

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

        <Button id="submit-article" onClick={props.submitArticleHandler}>Submit Article</Button>
      </Form>
    </div>
  )
}

export default ArticleFormInput