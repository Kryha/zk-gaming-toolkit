// The 'power_up' program.
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

    struct DiceData {
        dice_1: u8,
        dice_2: u8,
        dice_3: u8,
        dice_4: u8,
        dice_5: u8,
        dice_6: u8,
        dice_7: u8,
        dice_8: u8,
        dice_9: u8,
        dice_10: u8,
    }

    struct Sum {
        sum: u8
    }

    // TODO: Check if we need a finalize here to make the burn effective
    transition use_birds_eye(power_up: PowerUp, dice_data: DiceData) -> Sum {
        assert_eq(power_up.power_up_id, 2u8);
        
        let total: u8 = dice_data.dice_1 + 
                        dice_data.dice_2 + 
                        dice_data.dice_3 + 
                        dice_data.dice_4 + 
                        dice_data.dice_5 + 
                        dice_data.dice_6 + 
                        dice_data.dice_7 + 
                        dice_data.dice_8 + 
                        dice_data.dice_9 + 
                        dice_data.dice_10;
        
        return Sum {
            sum: total,
        };
    }
}
