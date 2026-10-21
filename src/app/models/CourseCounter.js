const mongoose = require('mongoose');

const CourseCounterSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        sequenceValue: { type: Number, required: true, default: 0 },
    },
    {
        versionKey: false,
        collection: 'course_counters',
    },
);

module.exports = mongoose.model('CourseCounter', CourseCounterSchema);
