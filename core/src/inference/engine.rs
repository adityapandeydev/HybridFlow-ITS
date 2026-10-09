pub trait InferenceEngine: Send + Sync {
    fn infer_frame(&self, frame_data: &[u8], width: u32, height: u32) -> Result<Vec<[f32; 6]>, String>;
}
