var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var task = [];
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});
app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});
app.get("/", function(req, res) {
    res.render("index", { task: task  });
});
app.listen(3000, function() {
    console.log("server is running on port 3000");
});