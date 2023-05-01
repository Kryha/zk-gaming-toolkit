/**
 * Power-ups are matched to their ID in the following way:
 * 1. Grill
 * 2. Bird's Eye View
 * 3. Ménage à Troìs
 * 4. Double Up
 * 5. Vendetta
 * 6. Second Chance
 * 7. Coup
 * 8. Smoke and Mirrors
 * 9. Hypnosis
 */
program power_up.aleo {
    record PowerUp {
        owner: address,
        gates: u64,
        match_id: field,
        power_up_id: u8,
    }

    transition create_power_up(owner: address, public match_id: field, power_up_id: u8) -> PowerUp {
        return PowerUp {
            owner: owner,
            gates: 0u64,
            match_id: match_id,
            power_up_id: power_up_id,
        };
    }

    transition burn_power_up(power_up: PowerUp) {
        return;
    }

    transition transfer_power_up(receiver: address, power_up: PowerUp) -> PowerUp {
        return PowerUp {
            owner: receiver,
            gates: 0u64,
            match_id: power_up.match_id,
            power_up_id: power_up.power_up_id,
        };
    }
}
