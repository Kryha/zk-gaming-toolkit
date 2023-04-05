use aleo_rust::{AleoAPIClient, ProgramManager, RecordFinder};
use snarkvm_console::{account::PrivateKey, network::Testnet3, program::ProgramID};
use std::{env, path::PathBuf, str::FromStr};

fn main() {
    // parse args
    let args: Vec<String> = env::args().collect();
    let program_id_arg = &args.get(1).expect("Missing program id arg");
    let private_key_arg = &args.get(2).expect("Missing private key arg");
    // TODO: calculate fee from tx size
    let fee_arg = &args.get(3).expect("Missing fee arg");

    let fee: u64 = fee_arg.parse().expect("Fee parsing failed");

    // parse private key
    let private_key =
        PrivateKey::<Testnet3>::from_str(&private_key_arg).expect("Invalid private key");

    // parse program name, id and dir
    let id_parts: Vec<&str> = program_id_arg.split("_").collect();
    let program_name = id_parts[..id_parts.len() - 1].join("_");
    let program_id: String = program_id_arg.clone().clone() + ".aleo";
    let program_id = ProgramID::<Testnet3>::try_from(program_id).expect("Invalid program id");
    let program_dir: PathBuf = ["..", "..", "contracts", &program_name, "build"]
        .iter()
        .collect();

    // init aleo rust library
    let api_client = AleoAPIClient::<Testnet3>::testnet3();

    let mut program_manager = ProgramManager::<Testnet3>::new(
        Some(private_key),
        None,
        Some(api_client.clone()),
        Some(program_dir),
    )
    .expect("Program manager creation failed");

    let record_finder = RecordFinder::<Testnet3>::new(api_client.clone());

    // find fee record and deploy program
    let fee_record = record_finder
        .find_one_record(&private_key, fee)
        .expect("Fee record not found");

    program_manager
        .deploy_program(program_id, fee, fee_record, None)
        .expect("Deployment failed");
}
