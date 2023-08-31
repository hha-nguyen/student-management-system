import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  Stack,
  VStack
} from "@chakra-ui/react";
import {
  studentProfilePictureUrl,
  updateStudent,
  uploadStudentProfilePicture
} from "../../services/client.js";
import {
  errorNotification,
  successNotification
} from "../../services/notification.js";
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";

const MyTextInput = ({label, ...props}) => {
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

const MyDropzone = ({studentId, fetchStudents}) => {
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0])

    uploadStudentProfilePicture(
        studentId,
        formData
    ).then(() => {
      successNotification("Successful", "Profile picture uploaded")
      fetchStudents()
    }).catch(() => {
      errorNotification("Fail", "Failed to upload profile picture")
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
      <Box {...getRootProps()}
           w={'100%'}
           textAlign={'center'}
           border={'dashed'}
           borderColor={'gray.200'}
           borderRadius={'3xl'}
           p={6}
           rounded={'md'}>
        <input {...getInputProps()} />
        {
          isDragActive ?
              <p>Insert image here...</p> :
              <p>Drag an image here or click to select an image</p>
        }
      </Box>
  )
}

// And now we can use these
const UpdateStudentForm = ({fetchStudents, initialValues, studentId}) => {
  return (
      <>
        <VStack spacing={'5'} mb={'5'}>
          <Image
              borderRadius={'full'}
              boxSize={'150px'}
              objectFit={'cover'}
              src={studentProfilePictureUrl(studentId)}
          />
          <MyDropzone
              studentId={studentId}
              fetchStudents={fetchStudents}
          />
        </VStack>
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string()
              .max(15, '15 or less characters')
              .required('Tələb olunur'),
              surname: Yup.string()
              .max(20, '20 or less characters')
              .required('Tələb olunur'),
              email: Yup.string()
              .email('20 or less characters')
              .required('Is required'),
              group: Yup.string()
              .required('Is required'),
              course: Yup.number()
              .max(5, "5 and should have smaller number")
              .required('Is required'),
            })}
            onSubmit={(updatedStudent, {setSubmitting}) => {
              setSubmitting(true);
              updateStudent(studentId, updatedStudent)
              .then(res => {
                console.log(res);
                successNotification(
                    "Student ",
                    `${updatedStudent.name} is successfully updated`
                )
                fetchStudents();
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
          {({isValid, isSubmitting, dirty}) => (
              <Form>
                <Stack spacing={"15px"}>
                  <MyTextInput
                      label="Username"
                      name="name"
                      type="text"
                      placeholder="Ha"
                  />

                  <MyTextInput
                      label="Surname"
                      name="surname"
                      type="text"
                      placeholder="Nguyen Quang"
                  />

                  <MyTextInput
                      label="Email address"
                      name="email"
                      type="email"
                      placeholder="20020652@vnu.edu.vn"
                  />

                  <MyTextInput
                      label="Group"
                      name="group"
                      type="text"
                      placeholder="K65K"
                  />

                  <MyTextInput
                      label="Course"
                      name="course"
                      type="number"
                      placeholder="4"
                  />

                  <Button disabled={!(isValid && dirty) || isSubmitting}
                          type="submit">Submit</Button>
                </Stack>
              </Form>
          )}
        </Formik>
      </>
  );
};

export default UpdateStudentForm;