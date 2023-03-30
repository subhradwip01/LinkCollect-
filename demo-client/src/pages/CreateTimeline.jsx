import React from 'react'

function CreateTimeline({collectionId, handleCreateTimeline}) {

  return (
    <div>
        <form onSubmit={handleCreateTimeline}>
            <div>
                <label htmlFor="link">Link</label>
                <input name="link" htmlFor="link" type="text" />
            </div>
            <div>
                <label htmlFor="note">Add a Note</label>
                <input name="note" htmlFor="note" type="text" />
            </div>
            <button>Create</button>
        </form>
    </div>
  )
}

export default CreateTimeline