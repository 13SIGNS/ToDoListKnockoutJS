var initialData = JSON.parse(localStorage.getItem("LuzzedroToDoListTasks")) !== null?JSON.parse(localStorage.getItem("LuzzedroToDoListTasks")):[];
 
var TasksModel = function(tasks) {
    
    var self = this;
    
    self.tasks = ko.observableArray(
        ko.utils.arrayMap(
            tasks, 
            function(task) {
                return { 
                    content: ko.observable(task.content), 
                    isDone: ko.observable(task.isDone), 
                    label: ko.observable(task.label) };
            }
        )
    );
 
    self.addTask = function() {
        self.tasks.push({
            content: self.tasks.newContent,
            isDone: ko.observable(false),
            label: ko.observable()
        });
        this.save();
    };
 
    self.removeTask = function(task) {
        self.tasks.remove(task);
        self.save();
    };
    
    self.save = function() {
        localStorage.setItem("LuzzedroToDoListTasks", JSON.stringify(ko.toJS(self.tasks), null, 2));
        return true;
        
    };
};
 
ko.applyBindings(new TasksModel(initialData));