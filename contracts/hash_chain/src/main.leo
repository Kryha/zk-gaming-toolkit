// The 'hash_chain' program.
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

    function get_hash_chain(seed: u64) -> HashChain {
        let hash_1: field = Poseidon8::hash(seed);
        let hash_2: field = Poseidon8::hash(hash_1);
        let hash_3: field = Poseidon8::hash(hash_2);
        let hash_4: field = Poseidon8::hash(hash_3);
        let hash_5: field = Poseidon8::hash(hash_4);
        let hash_6: field = Poseidon8::hash(hash_5);
        let hash_7: field = Poseidon8::hash(hash_6);
        let hash_8: field = Poseidon8::hash(hash_7);
        let hash_9: field = Poseidon8::hash(hash_8);
        let hash_10: field = Poseidon8::hash(hash_9);
        let hash_11: field = Poseidon8::hash(hash_10);
        let hash_12: field = Poseidon8::hash(hash_11);
        let hash_13: field = Poseidon8::hash(hash_12);
        let hash_14: field = Poseidon8::hash(hash_13);
        let hash_15: field = Poseidon8::hash(hash_14);
        let hash_16: field = Poseidon8::hash(hash_15);
        let hash_17: field = Poseidon8::hash(hash_16);
        let hash_18: field = Poseidon8::hash(hash_17);
        let hash_19: field = Poseidon8::hash(hash_18);
        let hash_20: field = Poseidon8::hash(hash_19);
        let hash_21: field = Poseidon8::hash(hash_20);
        let hash_22: field = Poseidon8::hash(hash_21);
        let hash_23: field = Poseidon8::hash(hash_22);
        let hash_24: field = Poseidon8::hash(hash_23);
        let hash_25: field = Poseidon8::hash(hash_24);
        let hash_26: field = Poseidon8::hash(hash_25);
        let hash_27: field = Poseidon8::hash(hash_26);
        let hash_28: field = Poseidon8::hash(hash_27);
        let hash_29: field = Poseidon8::hash(hash_28);
        let hash_30: field = Poseidon8::hash(hash_29);
        let hash_31: field = Poseidon8::hash(hash_30);
        let hash_32: field = Poseidon8::hash(hash_31);

        return HashChain {
            hash_1,
            hash_2,
            hash_3,
            hash_4,
            hash_5,
            hash_6,
            hash_7,
            hash_8,
            hash_9,
            hash_10,
            hash_11,
            hash_12,
            hash_13,
            hash_14,
            hash_15,
            hash_16,
            hash_17,
            hash_18,
            hash_19,
            hash_20,
            hash_21,
            hash_22,
            hash_23,
            hash_24,
            hash_25,
            hash_26,
            hash_27,
            hash_28,
            hash_29,
            hash_30,
            hash_31,
            hash_32,  
        };
    }

    record HashChainRecord {
        owner: address,
        gates: u64,
        seed: u64,
        hash_chain: HashChain
    }

    transition create_hash_chain_record(owner: address, seed: u64) -> HashChainRecord {
        let hash_chain: HashChain = get_hash_chain(seed);
        return HashChainRecord {
            owner: owner,
            gates: 0u64,
            seed: seed,
            hash_chain: hash_chain,
        };
    }
}
