const fs = require("fs")

exports.getcontacts = async (req, res) => {
  try {
    const data = await fs.readFileSync("database.js", "utf-8");
    await res
      .status(200)
      .send({ message: "Data fetched successfully", data: JSON.parse(data) });
  } catch (err) {
    await res.status(400).send({ message: "Cannot fetch the data" });
    console.log(err + "cannot read files");
  }
};

exports.getcontactsById = async (req, res) => {
  try {
    const Id = req.params.Id;
    let data = await fs.readFileSync("database.js", "utf-8");
    data = JSON.parse(data);
    const result = data.find((item) => item.id == Id);
    result
      ? await res
          .status(200)
          .send({ message: "Data fetched successfully", data: result })
      : await res
          .status(400)
          .send({ message: "No data found with the given id" });
  } catch (err) {
    await res.status(409).send({ message: "Cannot process the request" });
    console.log(err + "cannot read files");
  }
};

exports.postcontacts = async (req, res) => {
  try {
    const input = req.body;
    let data = await fs.readFileSync("database.js", "utf-8");
    data = JSON.parse(data);
    input.id = Date.now();
    const check = await checkExistence(data, input);
    if (!check) {
      await data.push(input);
      await fs.writeFileSync("database.js", JSON.stringify(data), "utf-8");
      res.status(200).send({ message: "Data Posted in Database" });
    } else {
      res
        .status(409)
        .send({
          message: "cannot insert as phone number and email are already exist",
        });
    }
  } catch (err) {
    await res.status(409).send({ message: "Cannot process the request" });
    console.log(err + "cannot read files");
  }
};

exports.updateContacts = async (req, res) => {
  try {
    let input = req.body;
    const Id = req.params.Id;
    let data = await fs.readFileSync("database.js", "utf-8");
    data = JSON.parse(data);
    let oldData = data.find((item) => item.id == Id);
    if (oldData) {
      const keys = Object.keys(input);
      console.log(keys);
      keys.shift();
      await keys.forEach((item) => (oldData[item] = input[item]));
      console.log(oldData);
      await fs.writeFileSync("database.js", JSON.stringify(data), "utf-8");
      await res.status(200).send({ message: "Data updated Successfully !!!" });
    } else {
      await res.status(404).send({ message: "No entry found with given Id" });
    }
  } catch (err) {
    await res.status(409).send({ message: "Cannot process the request" });
    console.log(err + "cannot read files");
  }
};

exports.deleteContact = async (req, res) => {
  try {
    console.log("delete triggred");
    const Id = req.params.Id;
    console.log(Id);
    let data = await fs.readFileSync("database.js", "utf-8");
    data = JSON.parse(data);
    let newData = data.filter((item) => item.id != Id);
    console.log(newData);
    if (data.length == newData.length) {
      await res
        .status(409)
        .send({ message: "No engtry is found tto delete with given id" });
    } else {
      await fs.writeFileSync("database.js", JSON.stringify(newData), "utf-8");
      await res.status(200).send({ message: "Data deleted successfully" });
    }
  } catch (err) {
    await res.status(409).send({ message: "Cannot process the request" });
    console.log(err + "cannot read files");
  }
};

const checkExistence = async (data, input) => {
  const result = data.find(
    (item) => item.email === input.email && item.phone === input.phone
  );
  return result;
};
