import React, { useEffect, useState } from 'react';
import { Card, Loader, FormFeild } from '../components';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode' // import dependency

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  );
};

const Home = () => {
  const { userName } = useParams()
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [allPosts, setAllPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const returnPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://${window.location.hostname}:8080/api/v1/post`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    returnPosts();
  }, []);

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const result = allPosts.filter((post) => 
          post.prompt.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchResults(result);
      }, 500)
    );
  }

  const isExpired = () => {
    if(token === null) return true

    try {
      const decodedToken = jwtDecode(token);
      // console.log(token , decodedToken.username)
      const currentTime = Date.now() / 1000;

      return decodedToken.exp < currentTime; // Token is expired if true
    } catch (error) {
      console.log(error,"token erroe")
      return true
    }
  }
  const handleClick = () =>{
    console.log(token)
    if(isExpired()){
      navigate("/userin")
    }
    else{
      navigate(`/userin/create-post`)
    }
  }

  const handleLogout = () =>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <div className='flex justify-between items-center text-white font-bold text-2xl'>
        <h1 className="font-extrabold text-white text-[32px] w-full">Gallery</h1>
        {(isExpired()===false) && 
        <button onClick={handleLogout} className='w-1/5 flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Logout
        </button>}
        <button onClick={handleClick} className='w-1/5 ml-2 flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        Create
        </button>
        
  
        </div>
        <p className="mt-2 text-[#666e75] text-gray-700 w-full">
          jJoin us to generate your own images...
        </p>
      </div>

      <FormFeild
        type="text"
        labelName=""
        placeholder="Search..."
        value={searchText}
        handleChange={(e) => handleSearch(e)}
      />

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={searchResult} title='No search results found' />
              ) : (
                <RenderCards data={allPosts} title='No posts found' />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
