# FIXEdge on Kubernetes Helm Chart
This is the Official EPAM B2Bits Helm chart for installing and configuring FIXEdge on Kubernetes.

[Overview of EPAM B2Bits FIXEdge®](https://www.b2bits.com/trading_solutions/fixedge)

## Quickstart

```
$ kubectl create secret generic license-file --from-file=path/to/engine.license
$ helm repo add b2bits https://morozandralek.github.io/helmcharts
$ helm install my-fixedge b2bits/fixedge
```

## Introduction

This chart bootstraps a [FIXEdge®](https://www.b2bits.com/trading_solutions/fixedge) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.


## Prerequisites

-   Kubernetes 1.21+
-   Helm 3.9.0+
-   PV provisioner support in the underlying infrastructure
-   Valid License Key

## Obtaining a License Key

To run FIXEdge you will need a valid license key file. You can obtain a trial license from sales@btobits.com.

## Installing the Chart

To install the chart with the release name `my-fixedge`:

```
$ kubectl create secret generic license-file --from-file=path/to/engine.license
$ helm repo add b2bits https://morozandralek.github.io/helmcharts
$ helm install my-fixedge b2bits/fixedge
```


These commands deploy B2Bits FIXEdge on the Kubernetes cluster in the default configuration. The **Parameters** section below lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-fixedge` deployment:

```
$ helm delete my-fixedge
```

The command removes all the Kubernetes components associated with the chart and deletes the release. 

## Parameters
| Parameter                                 | Description                                                      | Default                                            |
|:----------------------------------------- |:---------------------------------------------------------------- |:-----------------------------------------------    |
| force_init_configs                        | Update config on re-deploy                                       | false                                              |
| git_configs.url                           | Repository with configuration for fixdge and fixicc-agent        | https://github.com/morozandralek/b2bits-config.git |
| git_configs.branch                        | Branch from the config repository                                | main                                               |
| imagePullSecrets                          | The secret to downloading an image from a private repository     | []                                                 |
| fixedge.image.url                         | Repository with fixedge image                                    | morozandralek/fixedge                              |
| fixedge.image.version                     | Version of the fixedge image                                     | 6.15.0                                             |
| fixedge.image.imagePullPolicy             | Image policy pull options                                        | Always                                             |
| fixedge.port                              | Application port                                                 | 8901                                               |
| fixedge.httpAdmPort                       | Admin application port                                           | 8903                                               |
| fixedge.livenessProbe.initialDelaySeconds | Number of seconds after the container has started before startup | 15                                                 |
| fixedge.livenessProbe.periodSeconds       | How often (in seconds) to perform the probe                      | 20                                                 |
| fixedge.resources                         | CPU/Memory resource requests/limits                              | Memory: 500Mi, CPU: 500m                           |
| fixedge.storage.class                     | Storage class name                                               | null (use default provided by K8s)                 |
| fixedge.storage.accessModes               | Access Mode for storage class                                    | ReadWriteOnce                                      |
| fixedge.fe_configs.size                   | Storage size                                                     | 1Gi                                                |
| fixedge.fe_sessions_logs.size             | Storage size                                                     | 1Gi                                                |
| fixedge.fe_app_logs.size                  | Storage size                                                     | 1Gi                                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install my-fixedge --set force_init_configs=true,fixedge.resources.limits.memory=800Mi b2bits/fixedge
```

The above command forces pull configuration on start (`force_init_configs=true`) and sets RAM limit to `800Mi`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install my-fixedge -f values.yaml b2bits/fixedge
```

> **Tip**: You can use the default [values.yaml](values.yaml) for reference.



## Configuration and installation details

### Using custom configuration

By default this helm chart clones FIXEdge configuration from `https://morozandralek.github.io/fixedge`.

If you choose to maintain your custom FIXEdge configuration in private Git repository, you shuold provide SSH details for access to remote repository:
```
$ kubectl create secret generic ssh-creds --from-file=path/to/known_hosts --from-file=path/to/id_rsa
```

```
$ helm install my-fixedge --set git_configs.url=<your-git-repo-ssh-url>,git_configs.branch=<your-git-repo-branch> b2bits/fixedge
```

It is expected that all FIXEdge configuration files are grouped under `fixedge` folder in your repository.

## Persistence
The [EPAM B2Bits FIXEdge](https://hub.docker.com/r/morozandralek/fixedge) image stores the FIXEdge data at the `/var/lib/fixedge` path of the container.

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
