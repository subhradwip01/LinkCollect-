import React, { useState } from 'react';

export default function Timeline({ timelineId, link, note, time, handleTimelineUpdate, handleTimelineDelete }) {
  const [displayClass, setDisplayClass] = useState("timeline");
  const [editClass, setEditClass] = useState("timeline hidden");
  const [noteText, setNoteText] = useState(note);

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleUpdateClick = () => {
    // Only update the note value if the "Update" button is clicked
    handleTimelineUpdate(timelineId, noteText);
    setDisplayClass("timeline");
    setEditClass("timeline hidden");
  };

  return (
    <>
      <div className={displayClass}>
        <div className=''>
          <a target="_blank" href={link}>{link}</a>
          <p>{note}</p>
        </div>
        <button onClick={() => {
          setDisplayClass("timeline hidden");
          setEditClass("timeline");
        }}>Edit</button>
        <button onClick={() => handleTimelineDelete(timelineId)}>Delete</button>
      </div>

      <div className={editClass}>
        <a target="_blank" href={link}>{link}</a>
        <div>
          <label htmlFor="note">Edit Note</label>
          <input name="note" value={noteText} onChange={handleNoteChange} htmlFor="note" type="text" />
        </div>
        <button onClick={handleUpdateClick}>Update</button>
        <button>Discard</button>
      </div>
    </>
  );
}
