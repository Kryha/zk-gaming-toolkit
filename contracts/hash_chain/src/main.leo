program hash_chain.aleo {
    struct HashChain {
        hash_1: field,
        hash_2: field,
        hash_3: field,
        hash_4: field,
        hash_5: field,
        hash_6: field,
        hash_7: field,
        hash_8: field,
        hash_9: field,
        hash_10: field,
        hash_11: field,
        hash_12: field,
        hash_13: field,
        hash_14: field,
        hash_15: field,
        hash_16: field,
        hash_17: field,
        hash_18: field,
        hash_19: field,
        hash_20: field,
        hash_21: field,
        hash_22: field,
        hash_23: field,
        hash_24: field,
        hash_25: field,
        hash_26: field,
        hash_27: field,
        hash_28: field,
        hash_29: field,
        hash_30: field,
        hash_31: field,
        hash_32: field,
    }

    record HashChainRecord {
        owner: address,
        gates: u64,
        seed: u64,
        hash_chain: HashChain
    }

    transition create_hash_chain_record(owner: address, seed: u64, hash_chain: HashChain) -> HashChainRecord {
        return HashChainRecord {
            owner: owner,
            gates: 0u64,
            seed: seed,
            hash_chain: hash_chain,
        };
    }
}
