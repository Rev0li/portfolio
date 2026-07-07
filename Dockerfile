# ── Build : compile le binaire Rust ─────────────────────────
FROM rust:1.85-slim AS builder

WORKDIR /app

# Couche de cache : compile les dépendances seules d'abord,
# pour ne pas tout rebuilder à chaque changement de src/
COPY Cargo.toml Cargo.lock ./
RUN mkdir src \
    && echo "fn main() {}" > src/main.rs \
    && cargo build --release --locked \
    && rm -rf src

COPY src ./src
RUN touch src/main.rs && cargo build --release --locked

# ── Runtime : image minimale, utilisateur non-root ───────────
FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/target/release/portfolio ./portfolio
COPY static ./static

USER 65534:65534

EXPOSE 3000

CMD ["./portfolio"]
