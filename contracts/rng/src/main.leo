// The 'rng' program.
program rng.aleo {
    record RandomNumberRecord {
        owner: address,
        gates: u64,
        random_number: u64
    }

    transition get_random_number(owner: address, seed: u64, min: u64, max: u64) -> RandomNumberRecord {
        let isValidSeed: bool = seed != 0u64;
        assert_eq(isValidSeed, true);
        
        let range: u64 = 1u64 + max - min;
        let random_number: u64 = min + seed.mod(range);

        return RandomNumberRecord {
            owner: owner,
            gates: 0u64,
            random_number: random_number
        };
    }
}
