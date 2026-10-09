pub struct WebsterCalculator;

impl WebsterCalculator {
    pub fn compute_optimum_cycle(lost_time_sec: f32, sum_flow_ratio: f32) -> f32 {
        let y = sum_flow_ratio.clamp(0.1, 0.95);
        (1.5 * lost_time_sec + 5.0) / (1.0 - y)
    }

    pub fn compute_green_split(optimum_cycle: f32, lost_time_sec: f32, phase_ratio: f32, sum_ratio: f32) -> f32 {
        let effective_green = optimum_cycle - lost_time_sec;
        if sum_ratio > 0.0 {
            (phase_ratio / sum_ratio) * effective_green
        } else {
            effective_green / 2.0
        }
    }
}
