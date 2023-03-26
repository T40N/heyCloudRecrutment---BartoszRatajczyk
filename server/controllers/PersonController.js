class PersonController {
  constructor(PersonModel) {
    this.personModel = PersonModel;
  }

  validatePersonBody({ name, surname, pesel, birthDate }) {
    return (
      typeof name === "string" &&
      typeof surname === "string" &&
      typeof pesel === "string" &&
      pesel.length === 11 &&
      typeof birthDate === "string"
    );
  }

  saveNewPerson(req, res) {
    console.log(req.body);
    if (!this.validatePersonBody(req.body)) {
      return res.status(400).json({
        message: "Wrong data send.",
        data: req.body,
      });
    }

    this.personModel
      .create({
        name: req.body.name,
        surname: req.body.surname,
        pesel: req.body.pesel,
        birthDate: new Date(req.body.birthDate),
      })
      .then(() => {
        return res.status(201).json({
          message: "Person saved successfully.",
          data: req.body,
        });
      })
      .catch(() => {
        return res.status(500).json({
          message: "Failed to save to databese.",
          data: req.body,
        });
      });
  }

  getPersons(req, res) {
    this.personModel
      .findAll()
      .then((persons) => {
        res.status(200).json({
          message: "Persons retrived successfully.",
          data: persons,
        });
      })
      .catch(() => {
        return res.status(500).json({
          message: "Failed to retrive data from database.",
          data: [],
        });
      });
  }
}

module.exports = PersonController;
