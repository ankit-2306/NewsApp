
import { useState } from "react"
import { useEffect } from "react"
// import { useContext } from "react"
import axios from 'axios'
import { useContext } from "react"

import Pagination from "../pagination.jsx";

 import { store } from "../../App.jsx"

const News = () => {

    

    const [dataNews, setData] = useState([])

     const [currentPage,setCurrentPage]=useState(1)

    const {category,setCategory,searchVal,setSearchVal}=useContext(store)
    
    const pageSize=12

    const totalArtical=dataNews.length

    console.log(totalArtical)

    const totolPages=Math.ceil(totalArtical/pageSize)

    const startIndex=(currentPage-1)* pageSize

    const endIndex=startIndex+pageSize;

    const currentArticles=dataNews.slice(startIndex,endIndex)

    

    // const pagesSize=12

    const onPageChange=(pageNumber)=>{

        setCurrentPage(pageNumber)
    }
    
    

    

    useEffect(() => {

        console.log('change')

        const fetchData = async () => {

            try{

                const API_KEY = "309fd9c3c81f4dbd98d0f416a74d883e"
                let url = `https://newsapi.org/v2/top-headlines?country=in`
    
                if(category){
    
                    console.log(category,'yes')
    
                    console.log('yes')
                    url+=`&category=${category}`
                }
                if(searchVal){
                    
                    url+=`&q=${searchVal}`
                }
    
    
                
                url += `&apiKey=${API_KEY}`
    
                const resp = await axios.get(url)
    
                console.log(resp.data.articles)
    
                setData(resp.data.articles)

            }catch(err){

                console.log(err,'Eroor')

            }

           

        }



        fetchData()
    },[category,searchVal])




    return (
        <div className="bg-green-100">

            

                <div className="mt-5">
                        <div className='row flex flex-wrap gap-2 '>
                    {
                        currentArticles.map((article,index) => (

                            
                                
                       <div className='h-50 w-60 justify-center bg-purple-100'>
                            <div key={index} className="car  card mb-3">

                                <img src={article.urlToImage} alt='Image was not loaded' className="card-img-top h-40 w-30 bg-slate-50" />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text line-clamp-1">{article.description}</p>
                                        <a target="_blank" href={article.url} className="btn btn-primary to-blue-500 underline decoration-double hover:underline">For More</a>
                                    </div>
                            </div>
                       </div>


                        ))
                    }

                </div>

            </div>

            <Pagination currentPage={currentPage} totolPages={totolPages} onPageChange={onPageChange}/>





        </div>
    )
}
export default News