import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { checkLinkExist, getCollection } from '../api-services/collectionService';
import CreateTimeline from './CreateTimeline';
import Timeline from './Timeline';
import { createTimeline, deleteTimeline, updateTimeline } from '../api-services/timelineService';


function Collection() {
    const [collection, setCollection] = useState({})
    const { id: collectionId } = useParams();

    useEffect(() => {
        async function gettingCollection() {
            const { data } = await getCollection(collectionId)
            console.log(data)
            setCollection(data.data);
        }
        gettingCollection()
    }, [])

    const handleCreateTimeline = async (e) => {
        e.preventDefault();

        try{
            const { link, note } = e.target;

        // Check if the link Already Exist in the collection through route
        // const linkExist = (await checkLinkExist(collectionId, link.value)).data.data;
        // if (linkExist) return console.log("The link already exists")


        const time = new Date('14 Jun 2017 00:00:00 PDT').toUTCString();
        const timeline = { link: link.value, note: note.value, time }
        // For instant ui change
        // const tempCollection = {...collection};
        // tempCollection.timelines.push(timeline);
        // setCollection(tempCollection)

        // To make changes in DB
        const { data } = await createTimeline(collectionId, timeline);
        const tempCollection = { ...collection };
        tempCollection.timelines.push(data.data);
        setCollection(tempCollection)
        }
        catch(err){
            console.log(err.response.data.message)
        }
    }
    console.log(collection)

    const handleTimelineDelete = async (timelineId) => {
        // For instant ui change
        const tempCollection = { ...collection }
        tempCollection.timelines = tempCollection.timelines.filter(t => t._id !== timelineId)
        setCollection(tempCollection)

        // To make changes in DB
        await deleteTimeline(collection._id, timelineId);
    }

    const handleTimelineUpdate = async (timelineId, note) => {
        // For Instant Changes
        const tempCollection = { ...collection };
        tempCollection.timelines = tempCollection.timelines.map(t => {
            if (t._id !== timelineId) return t;
            t.note = note;
            return t;
        })
        setCollection(tempCollection)

        // To make changes in db
        await updateTimeline(collection._id, timelineId, { note })
    }


    return (
        <div className='collection'>
            <h1>{collection.title}Collection</h1>
            <img className="collection__image" src={collection.image && collection.image.replace("/upload", "/upload/w_500")} />
            {collection.timelines && collection.timelines.map((t, index) => (
                <Timeline key={index} timelineId={t._id} handleTimelineUpdate={handleTimelineUpdate} handleTimelineDelete={handleTimelineDelete} link={t.link} note={t.note} />
            ))}
            <h2>Add more timelines</h2>
            <CreateTimeline handleCreateTimeline={handleCreateTimeline} collectionId={collectionId} />
            <button style={{ "marginTop": "10px" }}><Link to="/">Back to all collections</Link></button>
        </div>
    )
}

export default Collection