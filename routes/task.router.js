const { Router } = require('express')
const { GetTaskList, CreateTask, UpdateTask, UpdateStatus, DeleteTask } = require('../controllers/task.controllers');
const multer = require('multer');
const router = Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get('/', GetTaskList)
router.post('/create', upload.single('image'), CreateTask)
router.put('/update/:id', upload.single('image'), UpdateTask)
router.patch('/update/:id/status', UpdateStatus)
router.delete('/delete/:id', DeleteTask)

module.exports = router