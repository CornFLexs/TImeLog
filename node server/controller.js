const Task = require('./model.js')

const  data_save =   (req, res) => {
    const task = new Task(req.body);
    task.save()
      .then((savedTask) => {
        res.json(savedTask);
        console.log("success saving");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving task');
      });
  }

const data_find = (req, res) => {
    const { date } = req.query;
    Task.find({ date })
      .exec()
      .then((tasks) => {
        res.json(tasks);
        console.log("success finding");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving tasks');
      });
  }

const data_delete = (req, res) => {
    const { id } = req.params;
    Task.findByIdAndRemove(id)
      .then(() => {
        res.sendStatus(204);
        console.log("success deleting");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error deleting task');
      });
  }

module.exports = {
    data_save , data_find , data_delete
}