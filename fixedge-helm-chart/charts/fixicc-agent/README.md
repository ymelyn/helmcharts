# FIXICC-agent on Kubernetes Helm Chart
This is the Official EPAM B2Bits Helm chart for installing and configuring FIXICC Agent on Kubernetes.

FIXICC Agent is a sidecar process, that allows to monitor and manage [FIXEdge](https://github.com/morozandralek/helmcharts/tree/main/fixedge-helm-chart/charts/fixedge) with help of a desktop GUI application, FIX Integrated Control Center ("FIXICC").

[Overview of EPAM B2Bits FIX Integrated Control Center®](https://www.b2bits.com/trading_solutions/fixicc)

## TL;DR

```
$ helm repo add b2bits https://morozandralek.github.io/helmcharts
$ helm install my-fixicc-agent b2bits/fixicc-agent
```

## Introduction

This chart bootstraps a [fixicc-agent](https://kb.b2bits.com/display/B2BITS/FIXICC+User+Guide) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.


## Prerequisites

-   Kubernetes 1.21+
-   Helm 3.9.0+
-   PV provisioner support in the underlying infrastructure
-   FIXEdge installed in same K8s cluster

## Installing FIXEdge
Normally you would not run FIXICC Agent by its own, it works only when paired with FIXEdge instance. 

To install FIXEdge follow the instructions in [FIXEdge on Kubernetes Helm Chart](https://github.com/morozandralek/helmcharts/tree/main/fixedge-helm-chart/charts/fixedge).

## Installing the Chart

To install the chart with the release name `my-fixicc-agent`:

```
$ helm repo add b2bits https://morozandralek.github.io/helmcharts
$ helm install my-fixicc-agent b2bits/fixicc-agent
```

These commands deploy B2Bits FIXICC Agent on the Kubernetes cluster in the default configuration. The **Parameters** section below lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-fixicc-agent` deployment:

```
$ helm delete my-fixicc-agent
```

The command removes all the Kubernetes components associated with the chart and deletes the release. 

## Parameters
| Parameter                                      | Description                                                      | Default                                         |
| ---------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| force_init_configs                             | Update config on re-deploy                                       | false                                           |
| git_configs.url                                | Repository with configuration for fixdge and fixicc-agent        | https://github.com/morozandralek/helmcharts.git |
| git_configs.branch                             | Branch from the config repository                                | main                                            |
| imagePullSecrets                               | The secret to downloading an image from a private repository     | []                                              |
| fixicc_agent.image.url                         | Repository with fixicc-agent image                               | morozandralek/fixicc-agent                      |
| fixicc_agent.image.version                     | Version of the fixicc-agent image                                | 6.13.1-518                                      |
| fixicc_agent.image.imagePullPolicy             | Image policy pull options                                        | Always                                          |
| fixicc_agent.port                              | Application port                                                 | 8005                                            |
| fixicc_agent.livenessProbe.initialDelaySeconds | Number of seconds after the container has started before startup | 15                                              |
| fixicc_agent.livenessProbe.periodSeconds       | How often (in seconds) to perform the probe                      | 20                                              |
| fixicc_agent.NLB.enabled                       | Use AWS NLB service                                              | false                                           |
| fixicc_agent.NLB.allowCIDR                     | List of allowed addresses for NLB                                | []                                              |
| fixicc_agent.resources                         | CPU/Memory resource requests/limits                              | Memory: 200Mi, CPU: 200m                        |
| fixicc_agent.storage.class                     | Storage class name                                               | null (use default provided by K8s)              |
| fixicc_agent.storage.accessModes               | Access Mode for storage class                                    | ReadWriteOnce                                   |
| fixicc_agent.storage.fixicc_agent_configs.size | Storage size                                                     | 1Gi                                             |



Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install my-fixicc-agent --set force_init_configs=true,fixedge.fixicc_agent.limits.memory=800Mi b2bits/fixicc-agent
```

The above command forces pull configuration on start (`force_init_configs=true`) and sets RAM limit to `800Mi`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install my-fixicc-agent -f values.yaml b2bits/fixicc-agent
```

> **Tip**: You can use the default [values.yaml](values.yaml) for reference.



## Configuration and installation details

### Using custom configuration

By default this helm chart clones FIXICC Agent configuration from `https://github.com/morozandralek/helmcharts`.

If you choose to maintain your custom FIXICC Agent configuration in private Git repository, you shuold provide SSH details for access to remote repository:
```
$ kubectl create secret generic ssh-creds --from-file=path/to/known_hosts --from-file=path/to/id_rsa
```

```
$ helm install my-fixicc-agent --set git_configs.url=<your-git-repo-ssh-url>,git_configs.branch=<your-git-repo-branch> b2bits/fixicc-agent
```

It is expected that all FIXICC Agent configuration files are grouped under `fixicc-agent` folder in your repository.

## Persistence
While FIXICC Agent does not has persistent state, it may need to read / write some of persistent state of FIXEdge.
This chart is configured to use same Persistent Volume Claims as FIXEdge for that purpose.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in AWS, minikube and k3s.
See the [Parameters](#parameters) section to configure the PVC.

## Where to get help
### Sales Information
Email: [sales@btobits.com](mailto:sales@b2bits.com)

### Technical Queries
For technical queries please contact [SupportFIXAntenna@epam.com](mailto:SupportFIXAntenna@epam.com)

## License

Copyright © B2BITS EPAM Systems Company 2000-2023 

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
