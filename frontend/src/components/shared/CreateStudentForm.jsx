import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  Stack
} from "@chakra-ui/react";
import {saveStudent} from "../../services/client.js";
import {
  errorNotification,
  successNotification
} from "../../services/notification.js";

const MyTextInput = ({label, ...props}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
      <Box>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
            <Alert className="error" status={"error"} mt={2}>
              <AlertIcon/>
              {meta.error}
            </Alert>
        ) : null}
      </Box>
  );
};

const MySelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
      <Box>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Select {...field} {...props} />
        {meta.touched && meta.error ? (
            <Alert className="error" status={"error"} mt={2}>
              <AlertIcon/>
              {meta.error}
            </Alert>
        ) : null}
      </Box>
  );
};

// And now we can use these
const CreateStudentForm = ({onSuccess}) => {
  return (
      <>
        <Formik
            initialValues={{
              name: '',
              surname: '',
              email: '',
              group: '',
              gender: '',
              course: '',
              password: ''
            }}
            validationSchema={Yup.object({
              name: Yup.string()
              .max(15, '15 Sign in to your account or must have fewer characters')
              .required('Is required'),
              surname: Yup.string()
              .max(15, '15 Sign in to your account or must have fewer characters')
              .required('Is required'),
              email: Yup.string()
              .email('20 Sign in to your account or must have fewer characters')
              .required('Is required'),
              group: Yup.string()
              .required('Is required'),
              password: Yup.string()
              .min(4, '4 or more characters')
              .max(15, '15 Sign in to your account or must have fewer characters')
              .required('Is required'),
              course: Yup.number()
              .required("Is required"),
              gender: Yup.string()
              .oneOf(
                  ['MALE', 'FEMALE'],
                  'Wrong choice'
              )
              .required('Is required'),
            })}
            onSubmit={(student, {setSubmitting}) => {
              setSubmitting(true);
              saveStudent(student)
              .then(res => {
                console.log(res);
                successNotification(
                    "Student saved",
                    `${student.name} saved successfully`
                )
                onSuccess(res.headers["authorization"]);
              }).catch(err => {
                console.log(err);
                errorNotification(
                    err.code,
                    err.response.data.message
                )
              }).finally(() => {
                setSubmitting(false);
              })
            }}
        >
          {({isValid, isSubmitting}) => (
              <Form>
                <Stack spacing={"15px"}>
                  <MyTextInput
                      label="Username"
                      name="name"
                      type="text"
                      placeholder="Nguyen"
                  />

                  <MyTextInput
                      label="Surname"
                      name="surname"
                      type="text"
                      placeholder="Quang Ha"
                  />

                  <MyTextInput
                      label="Email address"
                      name="email"
                      type="email"
                      placeholder="test@gmail.com"
                  />

                  <MyTextInput
                      label="Group"
                      name="group"
                      type="text"
                      placeholder="K65K"
                  />

                  <MyTextInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder={"*******"}
                  />

                  <MyTextInput
                      label="Course"
                      name="course"
                      type="text"
                      placeholder={"4"}
                  />

                  <MySelect label="Gender" name="gender">
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </MySelect>

                  <Button disabled={!isValid || isSubmitting} type="submit">
                  Submit</Button>
                </Stack>
              </Form>
          )}
        </Formik>
      </>
  );
};

export default CreateStudentForm;