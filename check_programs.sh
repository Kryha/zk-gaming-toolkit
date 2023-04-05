# comparing with previous HEAD should be enough since we squash our commits
files=$(git diff HEAD HEAD~ --name-only)

while IFS= read -r name; do
    if [[ $name =~ ^contracts/boloney_match/* ]]; then
        echo "##vso[task.setvariable variable=boloneyMatchUpdated]True"
    elif [[ $name =~ ^contracts/boloney_match_summary/* ]]; then
        echo "##vso[task.setvariable variable=boloneyMatchSummaryUpdated]True"
    elif [[ $name =~ ^contracts/dice/* ]]; then
        echo "##vso[task.setvariable variable=diceUpdated]True"
    elif [[ $name == ^contracts/power_up/* ]]; then
        echo "##vso[task.setvariable variable=powerUpUpdated]True"
    elif [[ $name == ^contracts/rng/* ]]; then
        echo "##vso[task.setvariable variable=rngUpdated]True"
    elif [[ $name == ^contracts/hash_chain/* ]]; then
        echo "##vso[task.setvariable variable=hashChainUpdated]True"
    fi
done <<<"$files"
