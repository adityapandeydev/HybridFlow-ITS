use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum VehicleClass {
    Car,
    ThreeWheel,
    Bus,
    Truck,
    Motorbike,
    Van,
}

impl VehicleClass {
    pub fn pcu_weight(&self) -> f32 {
        match self {
            VehicleClass::Bus | VehicleClass::Truck => 3.0,
            VehicleClass::Car | VehicleClass::Van => 1.0,
            VehicleClass::ThreeWheel => 1.0,
            VehicleClass::Motorbike => 0.5,
        }
    }
}
