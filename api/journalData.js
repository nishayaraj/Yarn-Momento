import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// Get all journals created by user - based on UID
const getMyJournals = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/myJournal.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// Update a single journal data based on firebaseKey
const updateAJournal = (journalObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/myJournal/${journalObj.firebaseKey}.json`, journalObj)
    .then(getMyJournals().then(resolve))
    .catch((error) => reject(error));
});

// Create new journal & update the created journal object with firebasekey
const createJournal = (journalObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/myJournal.json`, journalObj)
    .then((response) => {
      updateAJournal({ firebaseKey: response.data.name })
        .then(resolve);
    }).catch(reject);
});

// Get a single journal data, based on journalId -> firebaseKey
const getSingleJournal = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/myJournal/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// Delete a single journal data, based on journalId -> firebaseKey
const deleteSingleJournal = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/myJournal/${firebaseKey}.json`)
    .then(() => {
      getMyJournals(uid)
        .then((journalsArray) => resolve(journalsArray));
    })
    .catch((error) => reject(error));
});

const getJournalStories = (journalId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/myStories.json?orderBy="journalId"&equalTo="${journalId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getMyJournals,
  getSingleJournal,
  createJournal,
  updateAJournal,
  deleteSingleJournal,
  getJournalStories,
};
