function Add() {
  return (
    <>
      <div className="add-friend-wrapper">
        <h3 className="chunky">Add Friend</h3>
        <p>You can add friends here by their username</p>
        <div className="search friend-add">
          <input
            className="search-bar"
            type="text"
            placeholder="You can add friends here by their username"
          />
          <button>Send Friend Request</button>
        </div>
      </div>
    </>
  );
}

export default Add;
