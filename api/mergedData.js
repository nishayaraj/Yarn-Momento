import { getJournalStories, getSingleJournal, deleteSingleJournal } from './journalData';
import { getSingleStory, deleteStory, updateStory } from './storiesData';
import { updateUserProfile } from './userProfile';

const updateUserStoryLike = (storyObj, userProfileObj) => new Promise((resolve, reject) => {
  Promise.all([updateStory(storyObj), updateUserProfile(userProfileObj)])
    .then(([story, user]) => {
      resolve({ story, user });
    }).catch((error) => reject(error));
});

const viewStoryDetails = (storyFirebaseKey) => new Promise((resolve, reject) => {
  getSingleStory(storyFirebaseKey)
    .then((storyObject) => {
      getSingleJournal(storyObject.journalId)
        .then((journalObject) => {
          resolve({ journalObject, ...storyObject });
        });
    }).catch((error) => reject(error));
});

const viewJournalDetails = (journalFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleJournal(journalFirebaseKey), getJournalStories(journalFirebaseKey)])
    .then(([journalObject, journalStoriesArray]) => {
      resolve({ journal: journalObject, stories: journalStoriesArray });
    }).catch((error) => reject(error));
});

const deleteJournalStories = (journalId) => new Promise((resolve, reject) => {
  getJournalStories(journalId).then((storiesArray) => {
    const deleteStoryPromises = storiesArray.map((story) => deleteStory(story.firebaseKey));

    Promise.all(deleteStoryPromises).then(() => {
      deleteSingleJournal(journalId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteJournalAndStories = (journalFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([deleteSingleJournal(journalFirebaseKey), deleteJournalStories(journalFirebaseKey)])
    .then(resolve).catch((error) => reject(error));
});

export {
  viewStoryDetails,
  viewJournalDetails,
  deleteJournalAndStories,
  updateUserStoryLike,
};
