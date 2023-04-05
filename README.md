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

If your PR contains any changes to the Leo programs, make sure to perform the following actions before completing it so that the programs are correctly deployed to the testnet:

1. Tap the [Aleo faucet](https://twitter.com/AleoFaucet) by tweeting `@AleoFaucet
 send 10 credits to aleo178vq84yvu4kq2cg9ssedhpz4wgtnfq8nrhca3tpqjs3324p3gsrq7yt8u3`. Be sure to specify this exact address and amount of credits!
2. After a bit, the faucet should reply to your tweet with a URL. Wait for the tweet before proceeding with the next step.
3. Complete your PR and the pipeline should automatically deploy the new programs to the testnet using the credits you've just obtained. Just be patient... Like, [very patient](https://youtu.be/xNjyG8S4_kI)...

## Adding a new Leo program

When creating a new Leo program, the pipeline has to be updated in order for the program to be deployed to the testnet.

Let's assume the name of our program is `cool_program`. For it to be properly deployed, open `check_programs.sh` and edit it as follows:

```sh
files=$(git diff HEAD HEAD~ --name-only)

while IFS= read -r name; do
    # previous cases are omitted here
    ...
    elif [[ $name == ^contracts/cool_program/* ]]; then
        echo "##vso[task.setvariable variable=coolProgram]True"
    fi
done <<<"$files"
```

Then, in `azure-pipelines.yaml` define a new variable:

```yaml
variables:
    # previous variables omitted
    ...
    - name: coolProgramUpdated
      value: "False"
```

In the same file, under the `build_and_deploy_leo_programs` stage, add a new job:zzx

```yaml
- job: build_cool_program
    displayName: Build cool program
    condition: and(succeeded(), eq(variables['coolProgramUpdated'], 'True'))
    steps:
        - script: docker build -f Dockerfile.program .
          displayName: Cool program Docker build
          env:
              APP_NAME: cool_program
              PRIVATE_KEY: $(privateKey)
              BUILD_ID: $(buildId)
              FEE: 600000
        - script: echo "##vso[task.setvariable variable=coolProgramVersion]$(buildId)"
          displayName: Update cool program version locally
        - script: |
            az pipelines variable-group variable update \
            --group-id $(aleoProgramIdsGroupId) \
            --name coolProgramVersion \
            --org $(devOpsOrg) \
            --project $(devOpsProject) \
            --value $(coolProgramVersion)
        displayName: Update cool program version in variable group
        env:
            AZURE_DEVOPS_EXT_PAT: $(System.AccessToken)
```

The version variable has to be added to the pipeline variable group. For that, contact marius@kryha.io.

## Contribute

TODO: Explain how other users and developers can contribute to make your code better.
