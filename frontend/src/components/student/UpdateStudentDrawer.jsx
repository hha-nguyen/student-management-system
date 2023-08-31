import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import UpdateStudentForm from "./UpdateStudentForm.jsx";

const CloseIcon = () => "x";

const UpdateStudentDrawer = ({ fetchStudents, initialValues, studentId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            bg={'gray.200'}
            color={'black'}
            rounded={'full'}
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }}
            onClick={onOpen}
        >
            Edit
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Change student information</DrawerHeader>

                <DrawerBody>
                    <UpdateStudentForm
                        fetchStudents={fetchStudents}
                        initialValues={initialValues}
                        studentId={studentId}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<CloseIcon/>}
                        colorScheme={"teal"}
                        onClick={onClose}>
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>

}

export default UpdateStudentDrawer;