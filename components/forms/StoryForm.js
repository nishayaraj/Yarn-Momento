import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import AddJournalLink from '../AddJournalLink';
import { useAuth } from '../../utils/context/authContext';
import PageTitle from '../PageTitle';
import { createStory, getMyJournals, updateStory } from '../../api';

const initialState = {
  firebaseKey: '',
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

function StoryForm({ storyObj }) {
  const { user } = useAuth();
  const router = useRouter();

  const [formInput, setFormInput] = useState(initialState);
  const [journals, setJournals] = useState([]);

  useEffect(() => (storyObj?.firebaseKey || storyObj?.journalId) && setFormInput({ ...initialState, ...(storyObj || {}) }), [storyObj]);

  useEffect(() => {
    getMyJournals(user.uid).then((journalsData) => {
      setJournals(journalsData);
    });
  }, [user]);

  // handles form element change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  // handles journal type form element change
  const handleJournalTypeChange = (e) => {
    const journalId = e.target.value;
    let { isPublic } = formInput;

    const { journalType } = journals.find((journal) => journal.firebaseKey === journalId) || { journalType: undefined };
    if (journalType && journalType.toLowerCase().includes('personal')) {
      isPublic = false;
    }
    setFormInput({
      ...formInput, journalId, journalType, isPublic,
    });
  };

  // handles toggle button form element change
  const handleToggleChange = (e) => {
    const { name, checked = false } = e.target;
    let { journalId, journalType } = formInput;

    if (name === 'isPublic' && journalType?.toLowerCase().includes('personal')) {
      journalId = '';
      journalType = '';
    }

    setFormInput({
      ...formInput, [name]: checked, journalId, journalType,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      updateStory(formInput).then(() => router.back());
    } else {
      const payload = { ...formInput, uid: user.uid };
      createStory(payload).then(() => {
        router.back();
      });
    }
  };

  const isPublicToggleDisabled = () => (formInput?.journalType?.toLowerCase().includes('personal'));

  const renderStoryTypeOptions = () => journals.map((journal) => (
    <option
      key={journal.firebaseKey}
      value={journal.firebaseKey}
      selected={formInput.journalId === journal.firebaseKey}
    >
      {journal.journalType}
    </option>
  ));

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        color: 'black',
        lineHeight: '25px',
        padding: '30px 40px',
        border: '1px solid lightgray',
        borderRadius: '8px',
        marginBottom: '20px',
        background: 'white',
      }}
    >
      <PageTitle title={`${formInput.firebaseKey ? `Update : ${storyObj.title}` : 'Create story'}`} />
      <FloatingLabel
        controlId="floatingInput1"
        label="Story Title"
        className="mb-3"
        style={{ marginTop: '18px' }}
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
        style={{ marginTop: '25px' }}
      >
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Weave your Story here"
          maxLength={800}
          name="story"
          value={formInput.story}
          onChange={handleChange}
          required
          style={{
            lineHeight: '25px',
            minHeight: '200px',
          }}
        />
        <div style={{ margin: '4px 0px 20px', fontSize: '14px' }}>Limit: {formInput.story && `${formInput.story.length}/800`}</div>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Author Name"
        className="mb-3"
        style={{ marginTop: '25px' }}
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
        style={{ marginTop: '25px' }}
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
        style={{ marginTop: '25px' }}
      >
        <Form.Select
          aria-label="Journal"
          name="journalId"
          onChange={handleJournalTypeChange}
          className="mb-3"
          required
        >
          <option value="">Select a Journal Type</option>
          {renderStoryTypeOptions()}
        </Form.Select>
      </FloatingLabel>
      <div style={{ marginTop: '8px' }}><AddJournalLink /> </div>
      <FloatingLabel
        controlId="floatingInput2"
        label="Date"
        className="mb-3"
        style={{ marginTop: '25px' }}
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
        onChange={handleToggleChange}
        disabled={isPublicToggleDisabled()}
        style={{ marginTop: '25px' }}
      />

      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="isPublished"
        name="isPublished"
        label="Is Published ?"
        checked={formInput.isPublished}
        onChange={handleToggleChange}
        style={{ marginTop: '25px' }}
      />

      <Button
        type="submit"
        style={{
          marginTop: '25px',
          background: '#f38449',
          border: '1px solid #f38449',
        }}
      >
        {formInput.firebaseKey ? 'Update' : 'Create'} Story
      </Button>
    </Form>
  );
}

StoryForm.propTypes = {
  storyObj: PropTypes.shape({
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
  storyObj: initialState,
};

export default StoryForm;
