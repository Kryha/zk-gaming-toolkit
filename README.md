# ZK Gaming SDK

Game development API that allows interaction with the Aleo Zero-Knowledge platform.

## Getting Started

There are 2 main ways to run the API: locally or inside an isolated Minikube container.

### Running locally

Before running the API locally, make sure to install the following software:

- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Aleo](https://github.com/AleoHQ/aleo#2-build-guide)
- [Leo](https://github.com/AleoHQ/leo#2-build-guide)
- [SnarkOS](https://github.com/AleoHQ/snarkOS#22-installation)

To run the API, run the following from the project root directory:

```bash
yarn start
```

The API should be accessible at <http://localhost:5001>

### Running with Minikube

Before running the API with Minikube, make sure to install the following software:

- [Docker](https://docs.docker.com/engine/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) - perform only the first step, titled "Installation"
- [Skaffold](https://skaffold.dev/docs/install/)

Before running Minikube, make sure Docker is running. If you are on MacOS, make sure to give Docker access to at least 8GB of memory and at least 50GB of virtual disk. You can do that by opening Docker desktop -> settings (in the top right corner) -> resources.

Run Minikube:

```bash
minikube start --cpus=max --memory=max
```

Enable ingress add-on:

```bash
minikube addons enable ingress
```

Open a new terminal tab and run:

```bash
sudo minikube tunnel
```

This will allow you to access the deployed application at the address specified in the ingress configuration so keep it running in the background.

Return to the first terminal tab and run:

```bash
skaffold run
```

This will build the API and deploy it on the minikube cluster.

The first build will take some time, in the meantime you can [make the most of it and spend it in a useful way](https://theuselessweb.com/).

To check the status of your pods, run:

```bash
kubectl -n zk-gaming-tk-local get pods
```

To read the logs, run:

```bash
# pod_name can be retrieved from the output of the previous command
kubectl -n zk-gaming-tk-local logs <pod_name> -f
```

If the pods are running correctly, the API should be accessible at <http://zk-gaming-tk.localhost>

> ⚠️ On MacOS you may need to configure `dnsmasq` in order to access custom domain names. Consider following this [guide](https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/#2-only-send-test-and-box-queries-to-dnsmasq) and use `.localhost` instead of `.test` and `.box`.

## Submitting a PR

> ⚠️ These steps can only be completed by maintainers that have access to the wallet.

If a PR contains any changes to the Leo programs, make sure to perform the following actions before completing it so that the programs are correctly deployed to the testnet:

1. Navigate [here](https://demo.leo.app/faucet) and give some credits to the Kryha Aleo account.
2. Wait for the transaction to complete. Don't close the browser tab!
3. Complete the PR and the pipeline should automatically deploy the new programs to the testnet using the newly obtained credits. Just be patient... Like, [very patient](https://youtu.be/xNjyG8S4_kI)... Deployment through the pipeline takes about 8 minutes per program.

## Adding a new Leo program

When creating a new Leo program, the pipeline has to be updated in order for the program to be deployed to the testnet.

Let's assume the name of our program is `cool_program`. For it to be properly deployed, open `azure-pipelines.yaml` and add the following case to the `run_check_script` job:

```sh
files=$(git diff HEAD HEAD~ --name-only)

while IFS= read -r name; do
    # previous cases are omitted here
    ...
    elif [[ $name =~ ^contracts/cool_program/* ]]; then
        echo "##vso[task.setvariable variable=coolProgramUpdated;isoutput=true]True"
    fi
done <<<"$files"
```

Then, in `build_and_deploy_leo_programs_stage` define a new variable:

```yaml
variables:
    # previous variables omitted
    ...
    coolProgramUpdated: $[stageDependencies.check_updated_programs.run_check_script.outputs['UpdatedPrograms.coolProgramUpdated']]
```

In `build_and_deploy_leo_programs_job` job, after all the previously defined steps, add these new steps:

```yaml
          - script: |
              docker build -f Dockerfile.program . \
                --build-arg APP_NAME=cool_program \
                --build-arg PRIVATE_KEY=$(privateKey) \
                --build-arg BUILD_ID=$(buildId) \
                --build-arg FEE=600000 \
                --build-arg ZK_GAMING_ALEO="eu.gcr.io/web3-335312/aleo/zk-gaming-snarkos:latest"
            displayName: Cool Program Docker build
            condition: and(succeeded(), eq(variables['coolProgramUpdated'], 'True'))
            retryCountOnTaskFailure: 3
          - script: echo "##vso[task.setvariable variable=coolProgramVersion;isoutput=true]$(buildId)"
            displayName: Update Cool Program version locally
            condition: and(succeeded(), eq(variables['coolProgramUpdated'], 'True'))
          - script: |
              az pipelines variable-group variable update \
                --group-id $(aleoProgramIdsGroupId) \
                --name coolProgramVersion \
                --org $(devOpsOrg) \
                --project $(devOpsProject) \
                --value $(buildId)
            displayName: Update Cool Program version in variable group
            condition: and(succeeded(), eq(variables['coolProgramUpdated'], 'True'))
            env:
              SYSTEM_ACCESSTOKEN: $(System.AccessToken)
```

The version variable has to be added to the pipeline variable group. For that, contact marius@kryha.io.

## Contribute

TODO: Explain how other users and developers can contribute to make your code better.
