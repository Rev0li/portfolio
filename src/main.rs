use axum::Router;
use std::net::SocketAddr;
use tower_http::services::ServeDir;
use tower_http::compression::CompressionLayer;
use tracing_subscriber;

#[tokio::main]
async fn main() {
    // Initialise le logging
    tracing_subscriber::fmt::init();

    // Sert les fichiers statiques depuis le dossier "static"
    let app = Router::new()
        .nest_service("/", ServeDir::new("static"))
        .layer(CompressionLayer::new());

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("🚀 Portfolio en ligne sur http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
