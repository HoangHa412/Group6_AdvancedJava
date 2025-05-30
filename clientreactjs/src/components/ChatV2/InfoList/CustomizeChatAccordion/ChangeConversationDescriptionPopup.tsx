import { observer } from "mobx-react";
import { memo, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "@/stores";
import LogoutIcon from '@mui/icons-material/Logout';
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

function ChangeConversationDescriptionPopup(props: any) {
    const { open, handleClose } = props;

    const { chatStore } = useStore();
    const { chosenRoom, updateRoomInfo } = chatStore;

    const [isUpdating, setIsUpdating] = useState(false);
    async function handleChangeConversationDescription(values: any) {
        setIsUpdating(true);
        await updateRoomInfo(values);
        toast.success("Cuộc trò chuyện đã được cập nhật!");
        setIsUpdating(false);
        handleClose();
    }

    return (

        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Formik
                initialValues={{ description: chosenRoom?.description }}
                onSubmit={handleChangeConversationDescription}
            >
                {(props: any) => (
                    <Form autoComplete='off'>
                        <Box className='p-0 m-0 modal-container w-80' sx={{ border: 0, borderRadius: "10px" }}>
                            <div className="justify-between modalContainer flex-center appHeader" style={{ borderRadius: "10px 10px 0 0" }}>
                                <Typography className="p-3" variant='h5' sx={{ fontWeight: 800, color: "#fff" }}>Ghi chú cuộc trò chuyện</Typography>
                                <Button
                                    className="p-2 m-0 btnClose br-50p mw-unset"
                                    sx={{ color: "#fff" }}
                                    onClick={function () {
                                        handleClose();
                                    }}
                                >
                                    <ClearIcon />
                                </Button>
                            </div>

                            <div className="p-3 flex-center w-100">

                                <Field
                                    as={TextField}
                                    label="Tên mới của cuộc trò chuyện"
                                    name="description"
                                    placeholder="Nhập tên mới của cuộc trò chuyện..."
                                    fullWidth
                                    required
                                    disabled={isUpdating}
                                />

                            </div>

                            <div className='p-3 flex-center justify-right'>
                                <Button
                                    variant="contained"
                                    onClick={function () {
                                        handleClose();
                                    }}
                                    disabled={isUpdating}
                                >
                                    <ClearIcon
                                        className="mr-1"
                                    />
                                    Hủy bỏ
                                </Button>

                                <Button
                                    variant="contained"
                                    color="success"
                                    disabled={isUpdating}
                                    className="ml-2"
                                    type="submit"
                                >
                                    <LogoutIcon
                                        className="mr-1"
                                    />
                                    Cập nhật
                                </Button>
                            </div>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Modal >
    );
}

export default memo(observer(ChangeConversationDescriptionPopup));
