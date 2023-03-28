import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollection } from '../api-services/collectionService';
import CreateTimeline from './CreateTimeline';
import Timeline from './Timeline';
import { createTimeline, deleteTimeline, updateTimeline } from '../api-services/timelineService';


function Collection() {
    const [collection, setCollection] = useState({})
    const {id: collectionId} = useParams();

    useEffect(()=>{
        async function gettingCollection(){
            const {data} = await getCollection(collectionId)
            setCollection(data.data);
        }
        gettingCollection()
    },[])

    const handleCreateTimeline = async(e)=>{
        e.preventDefault();
        const {link, note} = e.target;
        const time = new Date('14 Jun 2017 00:00:00 PDT').toUTCString();
        const timeline = {link: link.value, note: note.value, time }
        //For instant ui change
        const tempCollection = {...collection};
        tempCollection.timelines.push(timeline);
        setCollection(tempCollection)

        // To make changes in DB
        return await createTimeline(collectionId, timeline);
      }

    const handleTimelineDelete = async(timelineId)=>{
        // For instant ui change
        const tempCollection = {...collection}
        tempCollection.timelines = tempCollection.timelines.filter(t=>t._id!==timelineId)
        setCollection(tempCollection)

        // To make changes in DB
        await deleteTimeline(collection._id, timelineId);
    }

    const handleTimelineUpdate = async(timelineId, note)=>{
        // For Instant Changes
        const tempCollection = {...collection};
        tempCollection.timelines = tempCollection.timelines.map(t=>{
            if(t._id !== timelineId) return t;
            t.note = note;
            return t;
        })
        setCollection(tempCollection)

        // To make changes in db
        await updateTimeline(collection._id, timelineId, {note})
    }


  return (
    <div className='collection'>
        <h1>{collection.title}Collection</h1>
        {collection.timelines && collection.timelines.map((t,index)=>(
            <Timeline key={index} timelineId={t._id} handleTimelineUpdate={handleTimelineUpdate} handleTimelineDelete={handleTimelineDelete} link={t.link} note={t.note} />
        ))}
        <h2>Add more timelines</h2>
        <CreateTimeline handleCreateTimeline={handleCreateTimeline} collectionId={collectionId} />
        <button style={{"marginTop": "10px"}}><a href="/">Back to all collections</a></button>
    </div>
  )
}

export default Collection