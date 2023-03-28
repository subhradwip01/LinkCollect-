import React from 'react'

function CreateCollection({handleCreateCollection}) {

  return (
    <div>
        <form onSubmit={handleCreateCollection}>
            <label htmlFor="title">Collection title</label>
            <input name="title" htmlFor="title" type="text" />
            <button>Create</button>
        </form>
    </div>
  )
}

export default CreateCollection