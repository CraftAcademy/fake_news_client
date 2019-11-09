import React from 'react'
import ImageUploader from 'react-images-upload'
import { Button, Input, TextArea, Form } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const ArticleFormInput = (props) => {

  const { t } = useTranslation()

  return (
    <div id="article-wrapper">
      <h2>{t("create.header")}</h2>
      <Form id="article-form" size="small">
        <div>
          <select id="categories" name="category" onChange={props.inputHandler}>
            <option name="politics" value="Politics">{t("create.selector.politics")}</option>
            <option name="economics" value="Economics">{t("create.selector.economics")}</option>
            <option name="tech" value="Tech">{t("create.selector.tech")}</option>
            <option name="lifestyle" value="Lifestyle">{t("create.selector.lifestyle")}</option>
            <option name="sports" value="Sports">{t("create.selector.sports")}</option>
            <option name="leisure" value="Leisure">{t("create.selector.leisure")}</option>
          </select>
        </div>
        <div>
          <Input fluid name="title" id="title-input" placeholder={t("create.title")} onChange={props.inputHandler} />
        </div>
        <div>
          <TextArea style={{ minHeight: 200 }} name="content" id="content-input" placeholder={t("create.content")} onChange={props.inputHandler} />
        </div>

        <ImageUploader
          buttonText={`${t("create.image")}`}
          withPreview
          withIcon
          withLabel={false}
          onChange={props.onAvatarDropHandler}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
          singleImage={true}
        />

        <Button id="submit-article" onClick={props.submitArticleHandler}>{t("create.submit")}</Button>
      </Form>
    </div>
  )
}

export default ArticleFormInput