use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TrackedVehicle {
    pub track_id: u64,
    pub bbox: [f32; 4],
    pub class_id: u32,
    pub confidence: f32,
}

pub struct ByteTracker {
    pub next_id: u64,
}

impl ByteTracker {
    pub fn new() -> Self {
        Self { next_id: 1 }
    }

    pub fn update(&mut self, _detections: &[[f32; 6]]) -> Vec<TrackedVehicle> {
        // Tracker update skeleton to be implemented
        Vec::new()
    }
}
