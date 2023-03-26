export default class ModalHandler {
  constructor(modal, modalBackdrop, modalMessage, closeModalButton) {
    this.modal = modal;
    this.modalBackdrop = modalBackdrop;
    this.modalMessage = modalMessage;
    this.closeModalButton = closeModalButton;

    this.closeModalButton.addEventListener(
      "click",
      this.closeModal.bind(this),
      false
    );
  }

  setModalMessage(messageValue) {
    this.modalMessage.innerText = messageValue;
  }

  openModal() {
    this.modalBackdrop.style.display = "block";
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modalBackdrop.style.display = "none";
    this.modal.style.display = "none";
  }
}
