import React, { Component } from 'react'

class ListArticle extends Component {
  state = {
    articlesData: []
  }
  
  getArticlesData() {
    let apiUrl = 'http://localhost/3001/api/v1/articles'
    debugger
    this.setState({
      articlesData: apiUrl.title
    })
  }

  render() {
    let dataIndex;

    if (this.state.articlesData === []) {
      debugger
      this.getArticlesData()
    }
    if (this.state.articlesData != []) {
      dataIndex = (
        <div>
          {this.state.articlesData.map(item => {
            return <div key={item.id}>{item.apiUrl.title}</div>
          })}
        </div>
      )
    }
    return (
      <>
        <h1>Fake News</h1>
        <div className="list-top-articles">
          {dataIndex}
        </div>
      </>
    )
  }
}

export default ListArticle