import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Constants from '../../../util/Constants';

const Content = () => {
  
  const [organizer_id, setOrganizerID] = useState('');
  const [access_token, setAccessToken] = useState('');

  useEffect(() => {

    buildfire.localStorage.getItem(Constants.organizer_id, (error, value) => {
      if (error) return console.error("something went wrong!", error);
      if (value) {
        setOrganizerID(value);
      } else {
        console.log("Nothing was previously saved");
      }
    });

    buildfire.localStorage.getItem(Constants.access_token, (error, value) => {
      if (error) return console.error("something went wrong!", error);
      if (value) {
        setAccessToken(value);
      } else {
        console.log("Nothing was previously saved");
      }
    });
    
  });

  function saveCredentionals (){

    buildfire.localStorage.setItem(Constants.organizer_id, organizer_id, (error) => {
      if (error) return console.error("something went wrong!", error);
      console.log("All is well, data saved and other plugins can now access it");
    });

    buildfire.localStorage.setItem(Constants.access_token, access_token, (error) => {
      if (error) return console.error("something went wrong!", error);
      console.log("All is well, data saved and other plugins can now access it");
    });

    let saveObject = {};
    saveObject[Constants.organizer_id] = organizer_id;
    saveObject[Constants.access_token] = access_token;

    buildfire.datastore.save(
      saveObject,
      Constants.settings,
      (err, result) => {
        if (err) return console.error("Error while saving your data", err);
    
        console.log("Data saved successfully", result);
      }
    );

  }
  
  return (
    <>
      <h1>Invirtu Video Conferencing</h1>
      <hr />

      <div>
        <label>Enter your organizer id</label>
        <input type="text" name="bw_organizer_id" value={organizer_id} onChange={e => { setOrganizerID(e.target.value)}} />
      </div>

      <div>
        <label>Enter your organizer access token</label>
        <input type="text" name="bw_acccess_token" value={access_token} onChange={e => { setAccessToken(e.target.value)}} />
      </div>

      <div>
          <button type="button" onClick={e => {saveCredentionals()}}>Save</button>
      </div>

    </>
  );

}

export default hot(Content);
