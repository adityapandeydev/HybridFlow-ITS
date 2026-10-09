use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum SignalPhase {
    NorthSouthGreen,
    NorthSouthYellow,
    AllRed1,
    EastWestGreen,
    EastWestYellow,
    AllRed2,
    EmergencyPreemption,
}

pub struct SignalController {
    pub current_phase: SignalPhase,
    pub remaining_sec: u32,
    pub emergency_active: bool,
}

impl SignalController {
    pub fn new() -> Self {
        Self {
            current_phase: SignalPhase::NorthSouthGreen,
            remaining_sec: 30,
            emergency_active: false,
        }
    }

    pub fn trigger_emergency_preemption(&mut self) {
        self.emergency_active = true;
        self.current_phase = SignalPhase::EmergencyPreemption;
    }
}
