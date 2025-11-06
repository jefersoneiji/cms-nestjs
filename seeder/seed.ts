import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    role: String
});

const articleSchema = new Schema({
    title: String,
    content: String,
    author_id: { type: mongoose.Types.ObjectId, ref: 'userdocuments' },
});

const permissionSchema = new Schema({
    name: String,
    description: String
});

const roleSchema = new Schema({
    name: String,
    permissions: [{ type: mongoose.Types.ObjectId, ref: 'permissionsdocuments' }]
});

async function seed() {
    const connection = await mongoose.connect('mongodb://localhost:27017/cms');

    console.log('Seeding user...');
    const user_model = connection.model('userdocuments', userSchema);

    const is_populated = await user_model.countDocuments();
    if (is_populated > 0) {
        await mongoose.connection.close();
        console.log('Seeding ended...');
        return;
    }

    await user_model.insertMany([
        { name: "John", email: 'admin@email.com', password: await bcrypt.hash('123456', 10), role: 'admin' },
        { name: "Alfred", email: 'editor@email.com', password: await bcrypt.hash('123456', 10), role: 'editor' },
        { name: "Jessica", email: 'reader@email.com', password: await bcrypt.hash('123456', 10), role: 'reader' }
    ]);

    console.log('Seeding permissions...');
    const permissionModel = connection.model('permissionsdocuments', permissionSchema);
    await permissionModel.insertMany(permissions);

    const role_model = connection.model('roledocuments', roleSchema);

    console.log('Seeding admin...');
    const admin_permissions = await permissionModel.find({ name: { $in: permissions.map(elem => elem.name) } }).select('_id').exec();
    await role_model.findOneAndUpdate({ name: 'admin' }, { name: 'admin', permissions: admin_permissions.map(p => p._id) }, { upsert: true, new: true });

    console.log('Seeding Editor...');
    const editor_permissions = await permissionModel.find({ name: { $in: ['read:article', 'create:article', 'edit:article', 'delete:article'] } }).select('_id').exec();
    await role_model.findOneAndUpdate({ name: 'editor' }, { name: 'editor', permissions: editor_permissions.map(p => p._id) }, { upsert: true, new: true });

    console.log('Seeding Reader...');
    const reader_permissions = await permissionModel.find({ name: { $in: ['read:article'] } }).select('_id').exec();
    await role_model.findOneAndUpdate({ name: 'reader' }, { name: 'reader', permissions: reader_permissions.map(p => p._id) }, { upsert: true, new: true });

    console.log('Seeding articles...');
    const article_model = connection.model('articledocuments', articleSchema);
    const admin_id = await user_model.findOne({ role: 'admin' }).select('_id').exec();
    const editor_id = await user_model.findOne({ role: 'editor' }).select('_id').exec();

    await article_model.insertMany(
        [
            {
                title: faker.lorem.sentence({ min: 10, max: 10 }),
                content: faker.lorem.paragraphs({ min: 1, max: 6 }),
                author_id: admin_id?._id
            },
            {
                title: faker.lorem.sentence({ min: 10, max: 10 }),
                content: faker.lorem.paragraphs({ min: 1, max: 6 }),
                author_id: editor_id?._id
            },
            {
                title: faker.lorem.sentence({ min: 10, max: 10 }),
                content: faker.lorem.paragraphs({ min: 1, max: 6 }),
                author_id: editor_id?._id
            }
        ]
    );

    await mongoose.connection.close();
    console.log('Seeding ended...');
}
seed();

const permissions = [
    { name: 'read:article', description: 'read articles' },
    { name: 'create:article', description: 'create articles' },
    { name: 'edit:article', description: 'edit articles' },
    { name: 'delete:article', description: 'delete articles' },
    { name: 'read:user', description: 'read users' },
    { name: 'create:user', description: 'create users' },
    { name: 'edit:user', description: 'edit users' },
    { name: 'delete:user', description: 'delete users' },
];