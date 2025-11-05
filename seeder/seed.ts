import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
    name: String,
    description: String
});

const roleSchema = new Schema({
    name: String,
    permissions: [{ type: mongoose.Types.ObjectId, ref: 'permission' }]
});

async function seed() {
    const connection = await mongoose.connect('mongodb://localhost:27017/cms');
    console.log('Began to seed...');
    const permissionModel = connection.model('permission', permissionSchema);
    await permissionModel.insertMany(permissions);

    const role_model = connection.model('role', roleSchema);

    console.log('Seeding admin...');
    const admin_permissions = await permissionModel.find({ name: { $in: permissions.map(elem => elem.name) } }).select('_id').exec();
    await role_model.findOneAndUpdate({ name: 'admin' }, { name: 'admin', permissions: admin_permissions.map(p => p._id) }, { upsert: true, new: true });

    console.log('Seeding Editor...');
    const editor_permissions = await permissionModel.find({ name: { $in: ['read:article', 'create:article', 'edit:article', 'delete:article'] } }).select('_id').exec();
    await role_model.findOneAndUpdate({ name: 'editor' }, { name: 'editor', permissions: editor_permissions.map(p => p._id) }, { upsert: true, new: true });

    console.log('Seeding Reader...');
    const reader_permissions = await permissionModel.find({ name: { $in: ['read:article'] } }).select('_id').exec();
    await role_model.findOneAndUpdate({ name: 'reader' }, { name: 'reader', permissions: reader_permissions.map(p => p._id) }, { upsert: true, new: true });

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