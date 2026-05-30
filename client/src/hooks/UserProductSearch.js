
// job -- manage all search pagination and filter state for user product search page
import {useState,useEffect,useCallback} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import {getProducts} from '../redux/slices/ProductSlice';
import axios from 'axios';

const userProductSearch=()=>{
    const [searchParams,setSearchParams]=useSearchParams();
    const navigate=useNavigate();
   const [keyword,setKeyword]=useState(searchParams.get('keyword') || '');
   const [category,setCategory]=useState(searchParams.get('category') || '');
   const [minPrice,setMinPrice]=useState(searchParams.get('minPrice') || '');
   const [maxPrice,setMaxPrice]=useState(searchParams.get('maxPrice') || '');
   
   const [sortBy,setSortBy]=useState(searchParams.get('sortBy') || '');
   const [order,setOrder]=useState(searchParams.get('order') || 'desc');
   const [page,setPage]=useState(parseInt(searchParams.get('page')) || 1);
   const [pages,setPages]=useState(1);
   const [products,setProducts]=useState([]);
   const [totalProducts,setTotalProducts]=useState(0);
   const [categories,setCategories]=useState([]);
   const [loading,setLoading]=useState(false);
   const [error,setError]=useState(null);
   const [debouncedValue,setDebouncedValue]=useState(keyword);

   //debounce search input to avoid too many API calls
   const debounce=(func,delay)=>{
    //debounce effect -wait 300ms after user stops typing
   useEffect(()=>{
     const timer=setTimeout(()=>{
        setDebouncedValue(keyword);
        setPage(1);//reset to page 1 when keyword changes
     },300)
     return ()=>clearTimeout(timer);//clear timer when component unmounts or when keyword changes
   })
} 
  useEffect(()=>{
    const fetchCategories=async()=>{
        try{
            const {data}=await axios.get('/api/products/categories');
            setCategories(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchCategories();
  },[]);
         
  //main fetch-run when filters,sort,page changes
  useEffect(()=>{
    const fetchProducts=async()=>{
        setLoading(true);
        setError(null);
        try{
            //build URL params object — only include non-empty values
            const params=new URLSearchParams();
            if(debouncedValue) params.append('keyword',debouncedValue);
            if(category) params.append('category',category);
            if(minPrice) params.append('minPrice',minPrice);
            if(maxPrice) params.append('maxPrice',maxPrice);
            if(sortBy) params.append('sortBy',sortBy);
            if(order) params.append('order',order);
            params.set('page',page);
            params.set('limit',6);

            //sync URL with current filters/sort/page
            setSearchParams(params);
            const {data}=await axios.get(`/api/products?${params}`);
            setProducts(data.products);
            setPages(data.pages);
            setTotalProducts(data.total);
        }catch(err){
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    fetchProducts();
  },[debouncedValue,category,minPrice,maxPrice,sortBy,order,page])
  //reset all filters
  const resetFilters = useCallback(() => {
    setKeyword('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('createdAt')
    setOrder('desc')
    setPage(1)
    navigate('/')
  }, [navigate])
  //count active filters for UI badge
  const activefilters=[debouncedValue,category,minPrice,maxPrice,sortBy!= 'createdAt' || order != 'desc'].filter(Boolean).length;

  return{
    keyword,
    setKeyword,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    order,
    setOrder,
    page,
    setPage,
    pages,
    products,
    totalProducts,
   
    categories,
  
    loading,
   
    error,
   
    resetFilters,
    activefilters
  }

}

export default userProductSearch;
