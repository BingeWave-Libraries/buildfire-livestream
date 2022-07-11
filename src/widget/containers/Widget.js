import { Config, Events } from 'bingewave-react-api';
import { VideoConferencing } from 'bingewave-react-widgets';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Constants from '../../util/Constants';

const Widget = () => { 

  const [mainContent, setMainContent] = useState('');

  const [footerContent, setFooterContent] = useState('');

  const [organizer_id, setOrganizerID] = useState('');

  const [access_token, setAccessToken] = useState('');
  
  useEffect(() => {

    buildfire.localStorage.getItem(Constants.organizer_id, (error, value) => {
      if (error) return console.error("something went wrong!", error);
      if (value) {
        setOrganizerID(value);

        if(access_token){
          displayVideoPage();
        }
        
      } else {
        console.log("Nothing was previously saved");
      }
    });


    buildfire.localStorage.getItem(Constants.access_token, (error, value) => {
      if (error) return console.error("something went wrong!", error);
      if (value) {
        setAccessToken(value);

        if(organizer_id){
          displayVideoPage();
        }
        
      } else {
        console.log("Nothing was previously saved");
      }
    });

    if(organizer_id && access_token){

    } else {
      setMainContent(<div>Both the organizer and access token is required.</div>);
    }

  });

  function displayVideoPage() {

    Config.setAuthToken(access_token);

    Events.createEvent({organizer_id : organizer_id, type : 7}).then(response => {

      if(response.status == "success"){
        setMainContent(<VideoConferencing id={response.data.id} />);
      }

    }).catch(error => {

    })
  }
  
  return (
    <>
      {mainContent}

      {footerContent}
    </>
  );

}

export default hot(Widget);
