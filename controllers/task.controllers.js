const Task = require('../models/task.model')
const path = require('path');
const fs = require('fs');
const GetTaskList = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const CreateTask = async (req, res) => {
    try {
        console.log("called..")
        const { title, description, dueDate, priority, status } = req.body;

        const task = new Task({
            title,
            description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority,
            status,
            image: req.file ? `/uploads/${req.file.filename}` : undefined,
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, status } = req.body;

        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "task not found !" })
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        if (req.file) {
            task.image = `/uploads/${req.file.filename}`
        }
        const updatedTask = await task.save();
        return res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const UpdateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = status;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', taskId: id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { GetTaskList, CreateTask, UpdateTask, UpdateStatus, DeleteTask }