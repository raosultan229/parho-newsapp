import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";





const News = (props)=>{
   
   const [articles,setArticles]=useState([])
   const [loading,setLoading]=useState(true)
   const [page,setPage]=useState(1)
   const [totalResults,setTotalResults]=useState(0)
  //  document.title= `${capitalizeFirstLetter(props.category)} - ParhoNews`
  
  const capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
    const updateNews = async ()=>{
    props.setProgress(10)
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d715a763c9de47c985b68e2447cafaac&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data= await fetch(url);
    props.setProgress(30)
    let parsedData= await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
   }
  useEffect(() => {
    // eslint-disable -next-line
    updateNews();  

  }, [])

  //  const handlePreClick=async ()=>{
  //     console.log("prev")
  //     // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d715a763c9de47c985b68e2447cafaac&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //     // this.setState({loading:true})
  //     // let data= await fetch(url);
  //     // let parsedData= await data.json()
  //     // console.log(parsedData);
  //     // // this.setState({articles: parsedData.articles})
  //     // this.setState({
  //     //   page: this.state.page - 1,
  //     //   articles: parsedData.articles,
  //     //   loading: false

  //     //   })
  //     setPage(page-1)
  //     updateNews()
  //   }
  //   const handleNextClick= async ()=>{
  //     console.log("next");
  //   //   if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){

  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d715a763c9de47c985b68e2447cafaac&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading:true})
  //   //   let data= await fetch(url);
  //   //   let parsedData= await data.json()
  //   //   console.log(parsedData);
  //   //   // this.setState({articles: parsedData.articles})
  //   //   this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   //   })
  //   // }
  //     setPage(page+1)
  //     updateNews()
  //   }
    const fetchMoreData = async () => {
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d715a763c9de47c985b68e2447cafaac&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data= await fetch(url);
      let parsedData= await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults( parsedData.totalResults)      
    };
    
 
    return (
      <>
        <h1 className='text-center' style={{margin:'90px 0px 40px'}}>ParhoNews - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >
         <div className="container">
        <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 70):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        
          
         })}
      </div>
      </div> 
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

       </div> */}
          
       
      </>
      

    )
  }


News.defaultProps={
  country: 'in',
  pageSize:'8',
  category: 'science'
}
News.propTypes={
  country: PropTypes.string,
  country: PropTypes.number,
  country: PropTypes.string,

}

export default News
