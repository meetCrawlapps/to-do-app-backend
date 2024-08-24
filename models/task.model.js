const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const baseDir = path.join(__dirname, '../');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['low', 'Moderate', 'Extreme'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'archived'],
        default: 'pending',
    },
    image: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
})
TaskSchema.pre('findOneAndDelete', async function (next) {
    const task = await this.model.findOne(this.getFilter());

    if (task) {
        if (task.image) {
            const imagePath = path.join(baseDir, task.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image: ${err.message}`);
                }
            });
        }
    }

    next();
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task