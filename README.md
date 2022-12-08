# FIXEdge Helm Chart

### Overview
FIX server FIXEdge is an application server providing FIX connectivity to multiple clients. Client applications communicate with FIXEdge through one of the multiple transport protocols (e.g. Simple Sockets, JMS, IBM MQ) employing transport adaptors. It is designed to be as easy as possible to install, configure, administrate and monitor trading information flows. It is written in C++ and has a performance profile suitable for the needs of all clients up to and including large sell-side institutions and large volume traders. FIXEdge comes with a rich UI for monitoring session statuses and parameters in real-time.

### Get Repo Info

    helm repo add fixedge https://morozandralek.github.io/helmcharts
    helm repo update

*See [helm repo](https://helm.sh/docs/helm/helm_repo/) for command documentation.*

### Prepare
Create the necessary namespace, if necessary, you can use the existing one:

    kubectl create namespace fixedge

Use existing license or request a trial version from sales@btobits.com:

    kubectl create secret generic license-file --from-file=engine.license --namespace fixedge

If you want to use a private repository with configuration for fixedge and fixicc-agent, you need to add a key (by default, the configuration is in the public repository):

    kubectl create secret generic ssh-creds --from-file=known_hosts --from-file=id_rsa --namespace fixedge

*Command to generate known_hosts: `ssh-keyscan -H github.com > known_hosts` where `github.com` is the domain of your svc*

### Installing the Chart
To install the chart with the release name `my-release`:
    
    helm install my-release fixedge/fixedge --namespace fixedge
    helm install my-release fixedge/fixicc-agent --namespace fixedge

### Uninstalling the Chart
To uninstall/delete the my-release deployment:

    helm delete my-release --namespace fixedge

The command removes all the Kubernetes components associated with the chart and deletes the release.

### Configuration

#### FIXEdge:

| Parameter |  Description | Default |
| :-------- | :----------- | :------ |
| force_init_configs | Update config on re-deploy | false |
| git_configs.url | Repository with configuration for fixdge and fixicc-agent | https://github.com/morozandralek/helmcharts.git |
| git_configs.branch | Branch from the config repository | main |
| imagePullSecrets | The secret to downloading an image from a private repository | [] |
| fixedge.image.url | Repository with fixedge image | 611262376458.dkr.ecr.eu-central-1.amazonaws.com/fixedge |
| fixedge.image.version | Version of the fixedge image | 6.13.1-518 |
| fixedge.image.imagePullPolicy | Image policy pull options | Always |
| fixedge.port | Application port | 8901 |
| fixedge.httpAdmPort | Admin application port  | 8903 |
| fixedge.livenessProbe.initialDelaySeconds | Number of seconds after the container has started before startup | 15 |
| fixedge.livenessProbe.periodSeconds | How often (in seconds) to perform the probe | 20 |
| fixedge.resources | CPU/Memory resource requests/limits | Memory: 500Mi, CPU: 500m |
| fixedge.storage.class | Storage class name | storage-fe |
| fixedge.storage.accessModes | Access Mode for storage class | ReadWriteOnce |
| fixedge.fe_configs.size | Storage size | 1Gi |
| fixedge.fe_sessions_logs.size | Storage size | 1Gi |
| fixedge.fe_app_logs.size| Storage size | 1Gi |

Run with parameter override:

    helm install fixedge fixedge/fixedge --namespace fixedge\
    --set fixedge.resources.requests.cpu=1 \
    --set fixedge.resources.requests.memory=1Gi \
    --set fixedge.resources.limits.cpu=1 \
    --set fixedge.resources.limits.memory=1Gi

#### FIXICC:

| Parameter                  |  Description               | Default                    |
| -------------------------- | -------------------------- | -------------------------- |
| fixicc_agent.image.url | Repository with fixicc-agent image | 611262376458.dkr.ecr.eu-central-1.amazonaws.com/fixicc-agent |
| fixicc_agent.image.version | Version of the fixicc-agent image | 6.13.1-518 |
| fixicc_agent.image.imagePullPolicy | Image policy pull options | Always |
| fixicc_agent.port | Application port | 8005 |
| fixicc_agent.livenessProbe.initialDelaySeconds | Number of seconds after the container has started before startup | 15 |
| fixicc_agent.livenessProbe.periodSeconds | How often (in seconds) to perform the probe | 20 |
| fixicc_agent.NLB.enabled | Use AWS NLB service | false |
| fixicc_agent.NLB.allowCIDR | List of allowed addresses for NLB | [] |
| fixicc_agent.resources | CPU/Memory resource requests/limits | Memory: 200Mi, CPU: 200m |
| fixicc_agent.storage.class | Storage class name | storage-fixicc-agent |
| fixicc_agent.storage.accessModes | Access Mode for storage class | ReadWriteOnce |
| fixicc_agent.storage.fixicc_agent_configs.size | Storage size | 1Gi |

Run with parameter override:

    helm install fixicc-agent fixedge/fixicc-agent --namespace fixedge\
    --set fixicc_agent.resources.requests.cpu=1 \
    --set fixicc_agent.resources.requests.memory=1Gi \
    --set fixicc_agent.resources.limits.cpu=1 \
    --set fixicc_agent.resources.limits.memory=1Gi