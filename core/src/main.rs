mod config;
mod inference;
mod server;
mod tracker;
mod traffic;

use config::IntersectionConfig;
use traffic::controller::SignalController;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    tracing::info!("HybridFlow-ITS Core Engine initializing...");

    let _config = IntersectionConfig::default();
    let _controller = SignalController::new();

    tracing::info!("HybridFlow-ITS Core ready.");
}
