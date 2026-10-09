use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IntersectionConfig {
    pub min_green_sec: u32,
    pub max_green_sec: u32,
    pub yellow_sec: u32,
    pub all_red_sec: u32,
}

impl Default for IntersectionConfig {
    fn default() -> Self {
        Self {
            min_green_sec: 10,
            max_green_sec: 60,
            yellow_sec: 4,
            all_red_sec: 2,
        }
    }
}
