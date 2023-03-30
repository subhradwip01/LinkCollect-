import React from 'react'

function CreateCollection({handleCreateCollection}) {

  return (
    <div>
        <form encType="multipart/form-data" onSubmit={handleCreateCollection}>
            <label htmlFor="title">Collection title</label>
            <input name="title" htmlFor="title" type="text" />
            <label htmlFor="description">Collection description</label>
            <input name="description" htmlFor="description" type="text" />
            <label htmlFor="image">Collection image</label>
            <input name="image" htmlFor="image" type="file" />
            <button>Create</button>
        </form>
    </div>
  )
}

export default CreateCollection