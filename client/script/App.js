import FormHandler from "./FormHandler.js";
import ModalHandler from "./ModalHandler.js";

export default class App {
  constructor(serverUrl) {
    this.serverURL = serverUrl;

    this.form = document.getElementById("form");
    this.nameInput = document.getElementById("nameInput");
    this.surnameInput = document.getElementById("surnameInput");
    this.peselInput = document.getElementById("peselInput");
    this.dateInput = document.getElementById("birthDateInput");
    this.nameError = document.getElementById("nameError");
    this.surnameError = document.getElementById("surnameError");
    this.peselError = document.getElementById("peselError");
    this.birthDateError = document.getElementById("birthDateError");

    this.modal = document.getElementById("modal");
    this.modalBackdrop = document.getElementById("modalBackdrop");
    this.modalMessage = document.getElementById("modalMessage");
    this.closeModalButton = document.getElementById("closeModalButton");

    this.formHandler = new FormHandler(
      this.nameInput,
      this.surnameInput,
      this.peselInput,
      this.dateInput,
      this.nameError,
      this.surnameError,
      this.peselError,
      this.birthDateError
    );
    this.modal = new ModalHandler(
      modal,
      modalBackdrop,
      modalMessage,
      closeModalButton
    );

    this.form.addEventListener("submit", this.handleSubmit.bind(this), false);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.modal.openModal();
    if (this.formHandler.validateForm()) {
      try {
        await this.sendData(this.formHandler.getFormData());
        this.modal.setModalMessage("sukces");
      } catch {
        this.modal.setModalMessage("błąd");
      }
    } else {
      this.modal.setModalMessage("błąd");
    }
  }

  async sendData(requestBody) {
    try {
      await fetch(this.serverURL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
