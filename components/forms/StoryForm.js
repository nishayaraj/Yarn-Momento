/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMyJournals } from '../../api/journalData';
import { createStory, updateStory } from '../../api/storiesData';

const initialState = {
  title: '',
  authorName: '',
  story: '',
  date: '',
  public: false,
  isPublished: false,
};

function StoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [journals, setJournals] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMyJournals(user.uid).then(setJournals);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateStory(formInput).then(() => router.push('/myStories'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createStory(payload).then(() => {
        router.push('/myStories');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ color: 'black' }}>
      <h2 className="text-black mt-5">
        {obj.firebaseKey ? 'Update' : 'Create'}
        Story
      </h2>

      <FloatingLabel
        controlId="floatingInput1"
        label="Story Title"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Story Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Story"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Weave your Story here"
          name="story"
          value={formInput.story}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Author Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Author Name"
          name="authorName"
          value={formInput.authorName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelect"
        label="Journal Type"
      >
        <Form.Select
          aria-label="Journal"
          name="journalId"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Journal Type</option>
          {journals.map((journal) => {
            console.log(journal);
            return (
              <option
                key={journal.firebaseKey}
                value={journal.firebaseKey}
                selected={obj.journalId === journal.firebaseKey}
              >
                {journal.journalType}
              </option>
            );
          })}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Date"
        className="mb-3"
      >
        <Form.Control
          type="date"
          placeholder="Date"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="public"
        name="public"
        label="Public ?"
        checked={formInput.public}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          favorite: e.target.checked,
        }))}
      />

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isPublished"
        name="isPublished"
        label="Is Published ?"
        checked={formInput.public}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          favorite: e.target.checked,
        }))}
      />

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Story</Button>
    </Form>
  );
}

StoryForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    authorName: PropTypes.string,
    journalId: PropTypes.string,
    story: PropTypes.string,
    date: PropTypes.string,
    isPublished: PropTypes.bool,
    public: PropTypes.bool,
  }),
};

StoryForm.defaultProps = {
  obj: initialState,
};

export default StoryForm;
