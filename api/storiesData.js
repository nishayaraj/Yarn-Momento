import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMyStories = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/myStories.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createStory = (storyObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/myStories.json`, storyObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.title };
      axios.patch(`${dbUrl}/myStories/${response.data.title}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const deleteStory = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/myStories/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const updateStory = (storyObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/myStories/${storyObj.firebaseKey}.json`, storyObj)
    .then(resolve)
    .catch(reject);
});

const getSingleStory = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/myStories/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getMyStories,
  createStory,
  deleteStory,
  updateStory,
  getSingleStory,
};