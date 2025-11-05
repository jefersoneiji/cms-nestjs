import { SetMetadata } from "@nestjs/common";
import { Permissions } from "../enums";

export const PERMISSIONS_KEY = 'permissions';

export const RequiredPermissions = (...permissions: Permissions[]) => SetMetadata(PERMISSIONS_KEY, permissions);