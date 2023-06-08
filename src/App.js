import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getProduct = async () => {
    const res = await axios.get('https://dummyjson.com/products?limit=100');
    const data =  res.data.products;
    if(data && data.length) {
      setProducts(data);
      console.log('res: ',res,products);
    }
  }

  useEffect(()=>{
    getProduct();
  },[])

  const handlePagination = (selectedPage) => {
    if(selectedPage>0 && selectedPage<=(products.length/pageSize)) {
      setPage(selectedPage);
    }
  }

  return (
    <div className="App">
     <h2>Hey there</h2>
     {
        products && <div className='products'>
        { 
          products.slice(page*pageSize-pageSize, page*pageSize).map((item)=> {
            return <span className='products__single'>
                <img src={item.thumbnail} alt={item.title}/>
                <span>{item.title}</span>
              </span>
          }
          ) 
        }
        </div>
     }
     {
      products && <div className='pagination'>
        <span onClick={()=>{handlePagination(page-1)}}>⬅️</span>
        {[...Array(products.length/pageSize)].map((_,i)=>{
          return <span key={i} onClick={()=>{handlePagination(i+1)}} className={page==i+1?"pagination__selected":""}>{i+1}</span>
        })}
        <span onClick={()=>{handlePagination(page+1)}}>➡️</span>
      </div>
     }
    </div>
  );
}

export default App;
