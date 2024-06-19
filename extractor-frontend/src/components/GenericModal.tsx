import { Button, Modal } from "flowbite-react";
import React from "react";
import { ReactNode, useState } from "react";

interface GenericModalProps {
  headerTitle: string;
  modelBody: ReactNode;
  modalActivator: ReactNode;
}

export function GenericModal({
  headerTitle,
  modelBody,
  modalActivator,
}: GenericModalProps) {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  // Wrapping the modelBody to pass onCloseModal as a prop
  const wrappedModelBody = React.cloneElement(modelBody as React.ReactElement, {
    onCloseModal,
  });

  return (
    <>
      <Button outline onClick={() => setOpenModal(true)}>
        {modalActivator}
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header className={"flex justify-center"}>
          {headerTitle}
        </Modal.Header>
        <Modal.Body>{wrappedModelBody}</Modal.Body>
      </Modal>
    </>
  );
}
