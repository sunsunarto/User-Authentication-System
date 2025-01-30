import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginSchema } from './formValidation.js'

function UserLoginForm() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); 

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users')
    const data = await response.json();
    setUsers(data);
  };

  const validateUser = (email, password) => {
    const user = users.find((user) => user.email === email);
    return user && user.password === password; 
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const isValidUser = validateUser(values.email, values.password);
    if (isValidUser) {
      const user = users.find((user) => user.email === values.email);
      setLoggedInUser(user);
      localStorage.setItem('userID', user.id);
      resetForm();
    } else {
      alert('Invalid email or password');
    }
    setSubmitting(false);
  };

  return (
    <div className='loginForm'>
      {loggedInUser ? (
        <div>
          <h1>Welcome, {loggedInUser.username}</h1>
          <p>Your email: {loggedInUser.email}</p>
          <button onClick={() => setLoggedInUser(null)}>Logout</button>
        </div>
      ) : (
        <div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                </div>
                <button type="submit" disabled={isSubmitting}>Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default UserLoginForm;
