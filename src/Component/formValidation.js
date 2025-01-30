import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'please enter at least 3 characters')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()  
      .min(6,'password must be at least 6 characters')
      .required('passwaord is required'),
  });
  
  export const loginSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string()  
  });
