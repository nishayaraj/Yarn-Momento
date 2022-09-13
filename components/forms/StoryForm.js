/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import AddJournalLink from '../AddJournalLink';
import { useAuth } from '../../utils/context/authContext';
import { createStory, getMyJournals, updateStory } from '../../api';

const initialState = {
  title: '',
  authorName: '',
  story: '',
  date: '',
  imageUrl: '',
  journalId: '',
  journalType: '',
  isPublic: false,
  isPublished: false,
};

function StoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [journals, setJournals] = useState([]);
  const publicToggleRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'journalId') {
      const { journalType } = journals.find((journal) => journal.firebaseKey === value) || { journalType: undefined };
      let { isPublic } = formInput;
      if (journalType && journalType.toLowerCase().includes('personal')) {
        publicToggleRef.current.disabled = true;
        isPublic = false;
      } else {
        publicToggleRef.current.disabled = false;
      }
      setFormInput({
        ...formInput, [name]: value, journalType, isPublic,
      });
    } else {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  const handleToggleChange = (e) => {
    const { name, checked = false } = e.target;
    let { journalId, journalType } = formInput;
    if (name === 'isPublic' && journalType.toLowerCase().includes('personal')) {
      journalId = '';
      journalType = '';
    }

    setFormInput({
      ...formInput, [name]: checked, journalId, journalType,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateStory(formInput).then(() => router.back());
    } else {
      const payload = { ...formInput, uid: user.uid };
      createStory(payload).then(() => {
        router.back();
      });
    }
  };

  useEffect(() => {
    getMyJournals(user.uid).then((journalsData) => {
      setJournals(journalsData);
      if (obj.firebaseKey) {
        setFormInput(obj);
      } else if (obj.journalId) {
        handleChange({ target: { name: 'journalId', value: obj.journalId } });
      }
    });
  }, [obj, user]);

  const renderStoryTypeOptions = () => journals.map((journal) => (
    <option
      key={journal.firebaseKey}
      value={journal.firebaseKey}
      selected={obj.journalId === journal.firebaseKey}
    >
      {journal.journalType}
    </option>
  ));

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
          type="textarea"
          placeholder="Weave your Story here"
          maxLength={800}
          rows={7}
          name="story"
          value={formInput.story}
          onChange={handleChange}
          required
        />
        <p>Character Limit: {formInput.story && `${formInput.story.length}/800`}</p>
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
        controlId="floatingInput2"
        label="Story Image"
        className="mb-3"
      >
        <Form.Control
          type="imageUrl"
          placeholder="Enter an image url"
          name="imageUrl"
          value={formInput.imageUrl}
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
          {renderStoryTypeOptions()}
        </Form.Select>
      </FloatingLabel>

      {/* ToDo: change this to a link */}
      <div style={{ margin: '20px' }}><AddJournalLink /> </div>

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
        className="text-black mb-3"
        type="switch"
        name="isPublic"
        id="isPublic"
        label="Is this a public story ?"
        checked={formInput.isPublic}
        ref={publicToggleRef}
        onChange={handleToggleChange}
      />

      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="isPublished"
        name="isPublished"
        label="Is Published ?"
        checked={formInput.isPublished}
        onChange={handleToggleChange}
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
    journalType: PropTypes.string,
    story: PropTypes.string,
    imageUrl: PropTypes.string,
    date: PropTypes.string,
    isPublished: PropTypes.bool,
    isPublic: PropTypes.bool,
  }),
};

StoryForm.defaultProps = {
  obj: initialState,
};

export default StoryForm;
