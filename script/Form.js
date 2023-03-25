export default class FormHandler {
  constructor(
    nameInput,
    surnameInput,
    peselInput,
    birthDateInput,
    nameError,
    surnameError,
    peselError,
    birthDateError
  ) {
    this.PeselControlWeights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    this.PeselRegex = /^[0-9]{11}$/;

    this.nameInput = nameInput;
    this.surnameInput = surnameInput;
    this.peselInput = peselInput;
    this.birthDateInput = birthDateInput;

    this.nameError = nameError;
    this.surnameError = surnameError;
    this.peselError = peselError;
    this.birthDateError = birthDateError;

    this.peselInput.addEventListener(
      "blur",
      this.handlePeselInputBlur.bind(this),
      false
    );
    this.nameInput.addEventListener(
      "blur",
      this.validateName.bind(this),
      false
    );
    this.surnameInput.addEventListener(
      "blur",
      this.validateSurname.bind(this),
      false
    );
    this.birthDateInput.addEventListener(
      "blur",
      this.handleBirthInputBlur.bind(this),
      false
    );
  }

  validateForm() {
    console.log(
      "fullValidation: ",
      this.validateName() && this.validateSurname() && this.validatePesel()
    );
    return (
      this.validateName() && this.validateSurname() && this.validatePesel()
    );
  }

  validateName() {
    const nameValueTrimed = this.nameInput.value.trim();

    if (nameValueTrimed === "") {
      this.nameError.innerText = "Imię jest wymagane.";
      return false;
    }

    this.nameError.innerText = "";
    return true;
  }

  validateSurname() {
    const surnameValueTrimed = this.surnameInput.value.trim();

    if (surnameValueTrimed < 1) {
      this.surnameError.innerText = "Nazwisko jest wymagane.";
      return false;
    }

    this.surnameError.innerText = "";
    return true;
  }

  validatePesel() {
    // controll sum validation: https://gist.github.com/artpi/05cfdd87e31127171a54186d841ce648
    const peselValueTrimed = this.peselInput.value.trim();

    if (peselValueTrimed < 11 || !this.PeselRegex.test(peselValueTrimed)) {
      this.peselError.innerText = "Proszę wprowadzić poprawny numer PESEL.";
      return false;
    }

    let controlSum = 0;
    let controlNumber = +peselValueTrimed.substring(10, 11);

    for (let i = 0; i < this.PeselControlWeights.length; i++) {
      controlSum +=
        +peselValueTrimed.substring(i, i + 1) * this.PeselControlWeights[i];
    }

    controlSum = controlSum % 10;
    if ((10 - controlSum) % 10 === controlNumber) {
      this.peselError.innerText = "";
      return true;
    }

    this.peselError.innerText = "Proszę wprowadzić poprawny numer PESEL.";
    return false;
  }

  decodePeselBirthDate() {
    // pesel decode: https://gist.github.com/artpi/05cfdd87e31127171a54186d841ce648
    const peselValueTrimed = this.peselInput.value.trim();

    let year = +peselValueTrimed.substring(0, 2);
    let month = +peselValueTrimed.substring(2, 4);
    let day = +peselValueTrimed.substring(4, 6);

    if (month > 80) {
      year += 1800;
      month -= 80;
    } else if (month >= 60) {
      year += 2200;
      month -= 60;
    } else if (month >= 40) {
      year += 2100;
      month -= 40;
    } else if (month >= 20) {
      year += 2000;
      month -= 20;
    } else {
      year += 1900;
    }

    if (month < 10) {
      return `${year}-0${month}-${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  handlePeselInputBlur() {
    if (!this.validatePesel()) {
      return false;
    }
    this.birthDateInput.value = this.decodePeselBirthDate();
  }

  handleBirthInputBlur() {
    if (this.birthDateInput.value !== this.decodePeselBirthDate()) {
      this.birthDateError.innerText =
        "Numer PESEL wskazuje na inną datę urodzenia.";
      return false;
    }
  }
}
