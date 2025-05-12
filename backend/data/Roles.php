<?php

class Roles {
    const ADMIN = 'admin';
    const VEHICLE_OWNER = 'vehicle_owner';
    const INSPECTION_STAFF = 'inspection_staff';

    public static function all() {
        return [self::ADMIN, self::VEHICLE_OWNER, self::INSPECTION_STAFF];
    }
}
