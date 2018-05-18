import React from 'react';

const SelectUser = (props) => {


  return (

      <form id="selectUser-form">
        <div className="form-group">
          <label htmlFor="mTitle-field">Select User</label>
          <input id="mTitle-field" className="form-control" name="username" type="text" placeholder="Username" />
          <button className="btn btn-primary" onClick={() => props.showLobby()}>Submit User</button>
        </div>
      </form>
  )

};

export default SelectUser;
