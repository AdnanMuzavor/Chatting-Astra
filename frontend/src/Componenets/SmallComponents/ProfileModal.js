import React from "react";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalConten,
  Button,
  ModalContent,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ModalFooter } from "@chakra-ui/react";
const ProfileModal = ({ pic, name, email, isopen }) => {
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body mx-auto">
            <img src={pic} className="rounded-circle profile" alt="Avatar" />
            <h4 className="text-center mt-2 mb-2"> {email}</h4>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
