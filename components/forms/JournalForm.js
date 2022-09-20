import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PageTitle from '../PageTitle';
import { useAuth } from '../../utils/context/authContext';
import { createJournal, updateAJournal } from '../../api';

const initialState = {
  journalType: '',
  imageUrl: '',
  date: '',
};

function JournalForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateAJournal(formInput)
        .then(() => router.push('/my-journal'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createJournal(payload).then((journalFirebaseKey) => router.push(`/my-journal/${journalFirebaseKey}`));
    }
  };

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
      <PageTitle title={`${obj.firebaseKey ? `Update : ${obj.journalType}` : 'Create story'}`} />
      <FloatingLabel
        controlId="floatingInput1"
        label="Journal Type"
        className="mb-3"
        style={{ marginTop: '18px' }}
      >
        <Form.Control
          type="text"
          placeholder="Enter Journal Name"
          name="journalType"
          value={formInput.journalType}
          onChange={handleChange}
          required
        />
        <div
          style={{
            marginTop: '6px',
            fontSize: '14px',
          }}
        >
          Journal & stories from journal named &quot;personal&quot; will be private to the user
        </div>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Journal Image"
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
        controlId="floatingInput2"
        label="Date"
        className="mb-3"
        style={{ marginTop: '25px' }}
      >
        <Form.Control
          type="date"
          placeholder="Enter the Date"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button
        type="submit"
        style={{
          marginTop: '25px',
          background: '#f38449',
          border: '1px solid #f38449',
        }}
      >
        {obj.firebaseKey ? 'Update' : 'Create'} Journal
      </Button>
    </Form>

  );
}

JournalForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    journalType: PropTypes.string,
    date: PropTypes.string,
  }),
};

JournalForm.defaultProps = {
  obj: initialState,
};

export default JournalForm;
