import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${capitalFLetter(props.category)} - Top News`;



  const capitalFLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // 61afa71c884f4033abafb3cc5170239e

  const updateNews= async()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json()
    props.setProgress(70)
    // console.log(parseData)
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)

  }

  useEffect(()=>{
    updateNews();
  },[])

const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData)
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" style={{margin: "90px 0px 30px"}}>
          Todays News - Top {capitalFLetter(props.category)} Headlines
        </h1>

        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      Description={
                        element.description
                          ? element.description.slice(0, 85)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}


// News.defaultProps = {
//   country: "in",
//   pageSize: 8,
//   category: "general",
// };

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};


export default News;
