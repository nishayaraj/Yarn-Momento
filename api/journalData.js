import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMyJournals = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/myJournal.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createJournal = (journalObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/myJournal.json`, journalObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      // kittunnillallo - check this
      axios.patch(`${dbUrl}/myJournal/${response.data.name}.json`, payload)
        .then(() => {
          getMyJournals(journalObj.uid).then((data) => resolve(data));
        });
    }).catch(reject);
});

const getSingleJournal = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/myJournal/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleJournal = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/myJournal/${firebaseKey}.json`)
    .then(() => {
      getMyJournals(uid).then((journalsArray) => resolve(journalsArray));
    })
    .catch((error) => reject(error));
});

const updateJournal = (journalObj) => new Promise((resolve, reject) => {
  console.warn(journalObj);
  axios.patch(`${dbUrl}/myJournal/${journalObj.firebaseKey}.json`, journalObj)
    .then(() => getMyJournals().then((data) => {
      console.warn(data);
      resolve(data);
    }))
    .catch((error) => reject(error));
});

const getJournalStories = (journalId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/myStories.json?orderBy="journalId"&equalTo="${journalId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getMyJournals,
  getSingleJournal,
  createJournal,
  updateJournal,
  deleteSingleJournal,
  getJournalStories,
};
