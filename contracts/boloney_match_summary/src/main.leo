program boloney_match_summary.aleo {
    // Declared as fild but represents the user ID parsed as numerical values
    struct Ranking {
        p_1: field,
        p_2: field,
        p_3: field,
        p_4: field,
        p_5: field,
        p_6: field,
        p_7: field,
        p_8: field,
        p_9: field,
        p_10: field,
    }

    record MatchSummary {
        owner: address,
        gates: u64,
        match_id: field,
        ranking: Ranking,
    }

    transition create_match_summary(
        public owner: address, 
        public match_id: field, 
        public ranking: Ranking
        ) -> MatchSummary {
            return MatchSummary {
                owner: owner,
                gates: 0u64,
                match_id: match_id,
                ranking: ranking,
            };
    }
}
