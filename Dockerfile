# ═══════════════════════════════════════════
# 🦀 Build stage - Compile le binaire Rust
# ═══════════════════════════════════════════
FROM rust:1.77-slim AS builder

WORKDIR /app
COPY Cargo.toml Cargo.lock* ./
COPY src ./src

# Build en mode release pour la performance
RUN cargo build --release

# ═══════════════════════════════════════════
# 🚀 Runtime stage - Image légère
# ═══════════════════════════════════════════
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie le binaire compilé
COPY --from=builder /app/target/release/portfolio .

# Copie les fichiers statiques
COPY static ./static

EXPOSE 3000

CMD ["./portfolio"]
