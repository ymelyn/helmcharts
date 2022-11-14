## Usage

[Helm](https://helm.sh) must be installed to use the charts.  Please refer to
Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

  helm repo add fixdge https://morozandralek.github.io/helmcharts

If you had already added this repo earlier, run `helm repo update fixedge` to retrieve
the latest versions of the packages.  You can then run `helm search repo
fixedge` to see the charts.

To install the charts:

    kubectl create namespace fixedge
    kubectl create secret generic license-file --from-file=engine.license -n fixedge
    kubectl create secret generic ssh-creds --from-file=known_hosts --from-file=id_rsa -n fixedge
    helm install -n fixedge fixedge fixedge/fixedge -f values.yaml
    helm install -n fixedge fixicc-agent fixedge/fixicc-agent -f values.yaml

To uninstall the chart:

    helm delete -n fixedge fixedge
    helm delete -n fixedge fixicc-agent 
