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

    console.log("Starting Promise All");

    console.log(Constants.organizer_id);
    console.log(Constants.access_token);

    buildfire.localStorage.getItem(Constants.organizer_id, (error, value) => {
      console.log(value);
    });

    setTimeout(function () {
      /*
      Promise.all([
        buildfire.localStorage.getItem(Constants.organizer_id),
        buildfire.localStorage.getItem(Constants.access_token),
      ]).then(items => {

        console.log("Items");
        console.log(items);

        let has_organizer_token = false;

        let has_access_token = false;

        if (items[0]) {
          setOrganizerID(items[0]);
          has_organizer_token = true;
        }

        if (items[1]) {
          setAccessToken(items[1]);
          has_access_token = true;
        }

        if (has_access_token && has_access_token) {
          displayVideoPage(items[0], items[1]);
        } else {
          setMainContent(<div>Organizer ID and access token required.</div>);
        }*/


    }, 100);

    buildfire.datastore.get(Constants.settings, (err, result) => {
      if (err) return console.error("Error while retrieving your data", err);
      console.log("Main record", result.data);

      let has_organizer_token = false;

      let has_access_token = false;

      if (result.data[Constants.organizer_id]) {
        setOrganizerID(result.data[Constants.organizer_id]);
        has_organizer_token = true;
      }

      if (result.data[Constants.access_token]) {
        setAccessToken(result.data[Constants.access_token]);
        has_access_token = true;
      }

      if (has_access_token && has_access_token) {
        displayVideoPage(result.data[Constants.organizer_id], result.data[Constants.access_token]);
      } else {
        setMainContent(<div>Organizer ID and access token required.</div>);
      }
    });

  }, []);

  function displayVideoPage(organizer_id, access_token) {

    Config.setAuthToken(access_token);

    Events.createEvent({ organizer_id: organizer_id, type: 7 }).then(response => {

      if (response.status == "success") {
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
