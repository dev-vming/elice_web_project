import { Form } from "react-bootstrap";
import * as Api from "./api";

export default function ImageUpload({user}) {

    const formSubmit = async (e) => {
        e.preventDefault();
        const img = e.target.files[0];

        await Api.imgpost(`users/${user._id}/uploads`, img);
    }

        return (
        <>
            <div className="img-preview">
            <Form.Group encType='multipart/form-data' controlId="useProfileImg" className="mb-3">
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={formSubmit}
                />
            </Form.Group>

            </div>
        </>
        );
    }