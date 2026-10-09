use serde::{Deserialize, Serialize};
use crate::traffic::controller::SignalPhase;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TelemetryPacket {
    pub current_phase: SignalPhase,
    pub remaining_green_sec: u32,
    pub ns_pcu: f32,
    pub ew_pcu: f32,
    pub emergency_active: bool,
}
