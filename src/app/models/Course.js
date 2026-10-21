const mongoose = require('mongoose');
const CourseCounter = require('./CourseCounter');

const Schema = mongoose.Schema;
const COURSE_COUNTER_ID = 'course_id_counter';

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, required: true },
        level: { type: String },
        deletedAt: { type: Date, default: null },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Give each new course the next integer ID before saving it.
CourseSchema.pre('save', async function () {
    if (!this.isNew) {
        return;
    }

    const counter = await CourseCounter.findOneAndUpdate(
        { _id: COURSE_COUNTER_ID },
        { $inc: { sequenceValue: 1 } }, // tăng sequenceValue lên 1
        {
            upsert: true,
            returnDocument: 'after', // trả về bộ đếm sau khi tăng
        },
    );

    this._id = counter.sequenceValue;
});
// Custom query helper
CourseSchema.query.sortable = function (req) {
    if (!Object.hasOwn(req.query, '_sort')) {
        return this;
    }

    const validColumns = ['name', 'level', 'createdAt'];
    const validTypes = ['asc', 'desc'];
    const column = validColumns.includes(req.query.column)
        ? req.query.column
        : 'createdAt';
    const type = validTypes.includes(req.query.type)
        ? req.query.type
        : 'asc';

    return this.sort({ [column]: type });
};

module.exports = mongoose.model('Course', CourseSchema);
