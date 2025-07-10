# Local-Kubernetes-Project
Here’s a list of commonly used `kind` (Kubernetes IN Docker) commands you’ll frequently use during local development and testing:

---

### 🟢 **Cluster Management**

#### ✅ Create a cluster

```bash
kind create cluster
```

> Creates a cluster with the default name `kind`.

#### ✅ Create a cluster with a custom name

```bash
kind create cluster --name my-cluster
```

#### ✅ Create a cluster using a config file

```bash
kind create cluster --config kind-config.yaml
```

#### 🛑 Delete the default cluster

```bash
kind delete cluster
```

#### 🛑 Delete a named cluster

```bash
kind delete cluster --name my-cluster
```

#### 📋 List kind clusters

```bash
kind get clusters
```

---

### 🧰 **Working with Nodes**

#### 📋 List nodes in a cluster

```bash
kubectl get nodes
```

#### 🧪 Get info about a kind node container

```bash
docker ps
```

---

### 🔁 **Networking and Port Forwarding**

#### 🌐 Load a local Docker image into kind

```bash
kind load docker-image my-image:tag
```

#### 🛠️ Expose a local port to access the cluster

Kind doesn’t support LoadBalancer, so you'll use `kubectl port-forward` or Ingress.

```bash
kubectl port-forward service/my-service 8080:80
```

---

### ⚙️ **Advanced**

#### 🔍 View kubeconfig path for kind

```bash
kind get kubeconfig-path --name my-cluster
```

> Deprecated in recent versions — use the standard kubeconfig in `$HOME/.kube/config`.

#### 🔄 Restart kind cluster (delete + recreate)

```bash
kind delete cluster --name my-cluster && kind create cluster --name my-cluster
```

---

### 🧾 Example Config File (`kind-config.yaml`)

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
```

---

Great! Here's a curated list of **commonly used `kubectl` commands** grouped by category to help you manage Kubernetes clusters like a pro — especially helpful for interviews and daily work.

---

### 🧭 **Cluster & Context Management**

| Action               | Command                                      |
| -------------------- | -------------------------------------------- |
| View clusters        | `kubectl config get-clusters`                |
| View current context | `kubectl config current-context`             |
| View all contexts    | `kubectl config get-contexts`                |
| Switch context       | `kubectl config use-context CONTEXT_NAME`    |
| Delete context       | `kubectl config delete-context CONTEXT_NAME` |

---

### 🚀 **Deployments & Pods**

| Action                                      | Command                                   |
| ------------------------------------------- | ----------------------------------------- |
| List all pods                               | `kubectl get pods`                        |
| List all deployments                        | `kubectl get deployments`                 |
| Create from YAML                            | `kubectl apply -f deployment.yaml`        |
| Delete a deployment                         | `kubectl delete deployment my-deploy`     |
| View pod logs                               | `kubectl logs POD_NAME`                   |
| View logs of a pod with multiple containers | `kubectl logs POD_NAME -c CONTAINER_NAME` |
| Exec into a running pod                     | `kubectl exec -it POD_NAME -- /bin/sh`    |

---

### 📦 **Services & Networking**

| Action                 | Command                                       |
| ---------------------- | --------------------------------------------- |
| List services          | `kubectl get svc`                             |
| Port forward a service | `kubectl port-forward svc/my-service 8080:80` |
| Get ingress rules      | `kubectl get ingress`                         |

---

### 📁 **YAML Management**

| Action                        | Command                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| Dry-run and output YAML       | `kubectl create deployment nginx --image=nginx --dry-run=client -o yaml` |
| Export existing resource YAML | `kubectl get deployment my-deploy -o yaml`                               |

---

### 🧪 **Useful Operations**

| Action                           | Command                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------- |
| Scale a deployment               | `kubectl scale deployment my-deploy --replicas=3`                                |
| Rollout status                   | `kubectl rollout status deployment/my-deploy`                                    |
| Rollback a deployment            | `kubectl rollout undo deployment/my-deploy`                                      |
| Describe a pod or deployment     | `kubectl describe pod POD_NAME` or `kubectl describe deployment DEPLOYMENT_NAME` |
| Delete everything in a namespace | `kubectl delete all --all -n my-namespace`                                       |

---

### 🧹 **Clean-up**

| Action                 | Command                                 |
| ---------------------- | --------------------------------------- |
| Delete all pods        | `kubectl delete pods --all`             |
| Delete all deployments | `kubectl delete deployments --all`      |
| Delete namespace       | `kubectl delete namespace my-namespace` |

---

### 🧰 **Debugging & Troubleshooting**

| Action                                         | Command                                                    |
| ---------------------------------------------- | ---------------------------------------------------------- |
| Show pod events                                | `kubectl get events --sort-by=.metadata.creationTimestamp` |
| Top resources (if metrics-server is installed) | `kubectl top pod` or `kubectl top node`                    |
| Attach to a pod's terminal                     | `kubectl attach POD_NAME -c CONTAINER_NAME -i`             |

---

`Chart.yaml` is one of the **core files** in every Helm chart. It acts like the **"package.json" of a Helm chart**, describing metadata about the chart itself.

---

### 🧭 **What is `Chart.yaml` in Helm?**

In the context of Helm, `Chart.yaml`:

* Defines **metadata** about your Helm chart.
* Tells Helm what this chart is, what version it is, and optionally what app version it deploys.
* Is **required** for every chart. Helm will refuse to package or install a chart without it.

---

### 🔍 **Breakdown of your example**

```yaml
apiVersion: v2
name: react-app
description: A Helm chart for React App
version: 0.1.0
appVersion: "1.0"
```

| Field               | Meaning                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| `apiVersion: v2`    | Helm chart API version. Use `v2` for Helm 3.                                                                  |
| `name: react-app`   | The name of the chart — also used in the release name.                                                        |
| `description`       | A short explanation of what the chart does.                                                                   |
| `version: 0.1.0`    | The version of the **chart package**, not the app itself. This follows [SemVer](https://semver.org/).         |
| `appVersion: "1.0"` | The version of the actual application (e.g., the React app) being deployed. Used mostly for display purposes. |

---

### 📦 Where is `Chart.yaml` used?

* When you run `helm install`, Helm uses this file to identify and describe the chart.
* When you push or share charts (e.g., to a Helm repo), this file provides the metadata Helm uses to list it.
* It's used by `helm dependency` if your chart relies on other charts.

---

### 🔄 Example with dependencies

```yaml
apiVersion: v2
name: my-app
version: 1.2.3
dependencies:
  - name: mongodb
    version: 10.2.0
    repository: "https://charts.bitnami.com/bitnami"
```

This declares that your chart depends on the `mongodb` chart.

---