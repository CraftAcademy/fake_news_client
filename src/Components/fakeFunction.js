import React from 'react'
import { useTranslation } from 'react-i18next'

const FakeFunction = () => {
  
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t("fakeNews.header")}</h1>
    </div>
  )
}

export default FakeFunction
