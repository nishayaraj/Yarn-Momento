import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// Get all journals created by user - based on UID
const updateUserProfile = (userProfileObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/userProfile/${userProfileObj.firebaseKey}.json`, userProfileObj)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const getUserProfileData = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userProfile/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getUserProfileData,
  updateUserProfile,
};
