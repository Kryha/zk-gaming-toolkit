// The 'power_up_2a' program, aka "Bird's Eye".
program power_up_2a.aleo {
    record PowerUp {
        owner: address,
        gates: u64,
        match_id: field,
        power_up_id: u8,
    }

    record PowerUp2Result {
        owner: address
        gates: u64
        sum: u8
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

    transition use(power_up: PowerUp, dice_data: DiceData) -> PowerUp2Result {
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

        return PowerUp2Result {
            owner: power_up.owner,
            gates: 0u64,
            sum: total,
        };
    }
}
