-- Créer la base de données
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'miden') THEN
        CREATE DATABASE miden;
    END IF;
END $$;

-- Utiliser la base de données créée
\connect miden;

CREATE TABLE IF NOT EXISTS block_header (
    id SERIAL PRIMARY KEY,
    version INTEGER NOT NULL,
    prev_hash_d0 TEXT NOT NULL,
    prev_hash_d1 TEXT NOT NULL,
    prev_hash_d2 TEXT NOT NULL,
    prev_hash_d3 TEXT NOT NULL,
    block_num INTEGER NOT NULL,
    chain_root_d0 TEXT NOT NULL,
    chain_root_d1 TEXT NOT NULL,
    chain_root_d2 TEXT NOT NULL,
    chain_root_d3 TEXT NOT NULL,
    account_root_d0 TEXT NOT NULL,
    account_root_d1 TEXT NOT NULL,
    account_root_d2 TEXT NOT NULL,
    account_root_d3 TEXT NOT NULL,
    nullifier_root_d0 TEXT NOT NULL,
    nullifier_root_d1 TEXT NOT NULL,
    nullifier_root_d2 TEXT NOT NULL,
    nullifier_root_d3 TEXT NOT NULL,
    note_root_d0 TEXT NOT NULL,
    note_root_d1 TEXT NOT NULL,
    note_root_d2 TEXT NOT NULL,
    note_root_d3 TEXT NOT NULL,
    batch_root_d0 TEXT NOT NULL,
    batch_root_d1 TEXT NOT NULL,
    batch_root_d2 TEXT NOT NULL,
    batch_root_d3 TEXT NOT NULL,
    proof_hash_d0 TEXT NOT NULL,
    proof_hash_d1 TEXT NOT NULL,
    proof_hash_d2 TEXT NOT NULL,
    proof_hash_d3 TEXT NOT NULL,
    timestamp BIGINT NOT NULL
);

CREATE INDEX idx_timestamp ON block_header (timestamp);
CREATE INDEX idx_block_num ON block_header (block_num);
CREATE INDEX idx_prev_hash ON block_header (prev_hash_d0,prev_hash_d1,prev_hash_d2,prev_hash_d3);

