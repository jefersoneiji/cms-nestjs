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

    connection.model('permissionsdocuments', permissionSchema);

    const role_model = connection.model('roledocuments', roleSchema);
    const required_permission = "read:article";
    const role = "reader";

    console.log('Seeding admin...');
    const is_allowed = await role_model.aggregate(
        [
            { $match: { name: role } },
            {
                $lookup: {
                    from: 'permissionsdocuments',
                    localField: 'permissions',
                    foreignField: "_id",
                    as: 'matching_permissions'
                }
            },
            {
                $match: {
                    "matching_permissions.name": required_permission
                }
            },
            {
                $project: {
                    matching_permissions: 0,
                }
            }
        ],
        { lean: true }
    );
    console.log('RESULTS IN REQUIRED PERMISSION GUARD ARE: ', is_allowed);
    await mongoose.connection.close();
    console.log('Seeding ended...');
}
seed();
