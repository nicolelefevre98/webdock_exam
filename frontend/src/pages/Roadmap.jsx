import React, {useState, useEffect} from 'react';
import  '/./src/styles/Roadmap.scss';
import RoadmapColumn from '../components/RoadmapColumn';
import { Link } from 'react-router-dom';

const Roadmap = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data fra backend API
    fetch('http://217.78.237.62/post')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log('Error fetching data:', error));
  }, []); 

    return (
    <>
      <div className="roadmap">
        
        <RoadmapColumn status="Planned" posts={posts} />
        <RoadmapColumn status="In Progress" posts={posts} />
        <RoadmapColumn status="Completed" posts={posts} />
      </div>
      <button className='newRequest'>
        <Link to="/CreateRequest">New Request</Link>
      </button>
    
    </>
  )
}

export default Roadmap
