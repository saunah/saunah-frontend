# Kubernetes Deployment Notes Frontend

Some notes for reference on commands needed to deploy the application to a kubernetes cluster.

## Setting Local kubectl Context

In order to configure `kubectl` command-line tool, make sure the correct context is active.

Switch context with

```shell
kubectl config use-context minikube
```

where `minikube` is the name of the context to switch to.

Make also sure that the namespace is set in the kubeconfig file (found in `~/.kube/config`)

A sample kubeconfig file can be found in [`kubeconfig-example`](./kubeconfig-example). Modify it accordingly, rename it to `config` and place it at `~/.kube/config`.

## Deploying the Frontend

To deploy the frontend, run

```shell
helm upgrade --install -f helm/saunah-frontend/values-local.yaml saunah-frontend helm/saunah-frontend
```

where `values-local.yaml` should be replaced with the values file intended for the deployment.

## Listing Helm Charts

To list currently installed helm charts, run

```shell
helm list
```

## Removing a Helm Chart

To remove an installed helm chart, run

```
helm delete saunah-frontend
```

where `saunah-frontend` should be replaced with the actual name of the application which should be deleted.

## Listing Other Resources

To list other resources active on a cluster, run

```
kubectl get pods
kubectl get deployments
kubectl get secrets
kubectl get pvc
kubectl get pv
...
```

## Removing Other Resources

To remove other resources, run

```shell
kubectl delete pod name
kubectl delete pod name
kubectl delete pod name
kubectl delete pod name
kubectl delete pod name
...
```

where `name` should be replaced with the actual name of the resource to delete, which can be retrieved by listing the resources as shown above.
