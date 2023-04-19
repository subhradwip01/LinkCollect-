import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteCollection, getAllCollectionsWithoutTimelines } from '../api-services/collectionService';
import CreateCollection from './CreateCollection';
import { createCollection } from '../api-services/collectionService';
import { createMultipleTimelines } from '../api-services/timelineService';

function Home() {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login")
  })

  const getCollections = async () => {
    const { data } = await getAllCollectionsWithoutTimelines();
    setCollections(data.data);
  };

  useEffect(() => {
    getCollections()
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    return navigate("/login")
  }

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    const { title, description, image } = e.target;

    // When sending an encoded image we need to send it as multipart formData
    const formData = new FormData();

    // Appending the data
    formData.append("image", image.files[0])
    formData.append("description", description.value);
    formData.append("title", title.value);
    // Made changes

    const { data } = await createCollection(formData);
    const tempCollections = [...collections];
    tempCollections.push(data.data);
    setCollections(tempCollections);
    return navigate("/")
  }


  const handleCollectionDelete = async (collectionId) => {
    // For instant ui change
    const tempCollections = collections.filter(c => c._id !== collectionId);
    setCollections(tempCollections);

    // Changing in the db
    await deleteCollection(collectionId)
  }

  return (
    <div>
      <h1>Home</h1>
      {collections.map((c, index) => (
        <div key={index}>
          <div className='timeline'>
            <a href={`/collections/${c._id}`}>{c.title}</a>
            <button onClick={() => handleCollectionDelete(c._id)}>Delete</button>
          </div>
        </div>
      ))}
      <div style={{ "marginBottom": "20px" }}></div>
      <CreateCollection handleCreateCollection={handleCreateCollection} />
      <button style={{ "display": "block", "margin": "20px" }} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home