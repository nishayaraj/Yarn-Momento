import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createJournal, updateAJournal } from '../../api/journalData';

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
        .then(() => router.push(('/myJournal')));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createJournal(payload).then(() => {
        router.push('/myJournal');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ color: 'black' }}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Journal</h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Journal Type"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Journal Name"
          name="journalType"
          value={formInput.journalType}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Journal Image"
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
        controlId="floatingInput2"
        label="Date"
        className="mb-3"
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

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Journal</Button>
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
