# FIXEDGE Helm Chart

### Overview
FIX server FIXEdge is an application server providing FIX connectivity to multiple clients. Client applications communicate with FIXEdge through one of the multiple transport protocols (e.g. Simple Sockets, JMS, IBM MQ) employing transport adaptors. It is designed to be as easy as possible to install, configure, administrate and monitor trading information flows. It is written in C++ and has a performance profile suitable for the needs of all clients up to and including large sell-side institutions and large volume traders. FIXEdge comes with a rich UI for monitoring session statuses and parameters in real-time.

### Get Repo Info

    helm repo add fixdge https://morozandralek.github.io/helmcharts
    helm repo update

*See [helm repo](https://helm.sh/docs/helm/helm_repo/) for command documentation.*

### Installing the Chart
To install the chart with the release name `my-release`:

    kubectl create namespace fixedge

    kubectl create secret generic license-file --from-file=engine.license --namespace fixedge
    
    helm install my-release fixedge/fixedge --namespace fixedge
    helm install my-release fixedge/fixicc-agent --namespace fixedge

### Uninstalling the Chart
To uninstall/delete the my-release deployment:

    helm delete my-release --namespace fixedge

The command removes all the Kubernetes components associated with the chart and deletes the release.

### Configuration

| Parameter                  |  Description               | Default                    |
| -------------------------- | -------------------------- | -------------------------- |
| force_init_configs |  | false |
| git_configs.url |  | https://github.com/morozandralek/helmcharts.git |
| git_configs.branch |  | main |
| imagePullSecrets | | [] |
| fixedge.image.url | | 611262376458.dkr.ecr.eu-central-1.amazonaws.com/fixedge |
| fixedge.image.version | | 6.13.1-518 |
| fixedge.image.imagePullPolicy | | Always |
| fixedge.port | | 8901 |
| fixedge.httpAdmPort | | 8903 |
| fixedge.livenessProbe.initialDelaySeconds | | 15 |
| fixedge.livenessProbe.periodSeconds | | 20 |
| fixedge.resources | CPU/Memory resource requests/limits | Memory: 500Mi, CPU: 500m |