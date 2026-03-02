# 📋 Comandos de Referência

---

## ☸️ Kubernetes

### Contexto e Cluster

```bash
# Ver todos os contextos disponíveis
kubectl config get-contexts

# Trocar de cluster/contexto
kubectl config use-context {nome_do_cluster}
```

---

### PV / PVC

```bash
# Forçar remoção de finalizers (desbloquear PV/PVC preso em estado "Terminating")
kubectl patch pvc {nome_do_pv_ou_pvc} -p '{"metadata":{"finalizers":null}}'
```

---

### Namespaces

```bash
# Criar um namespace
kubectl create ns {nome}
```

---

### Deployments

```bash
# Editar um deployment diretamente no ETCD do control-plane
kubectl edit deploy nginx-deployment-practice -n nginx -o yaml

# Ver o YAML do deployment aplicado
kubectl get deploy nginx-deployment-practice -n nginx -o yaml

# Escalar réplicas para zero (matar pods sem deletar o deployment)
kubectl scale deploy -n nginx nginx-deployment-practice --replicas=0
```

---

### Pods

```bash
# Entrar dentro de um pod (com busca por nome)
kubectl exec -it $(kubectl get pods -o name | grep nginx) -- sh

# Subir um pod temporário com curl (auto-removível)
kubectl run curl-test --image=curlimages/curl -it --rm -- sh
```

---

### Rede / Port-Forward

```bash
# Abrir um túnel para o serviço Kafka
kubectl port-forward svc/kafka-service 9092:9092 -n kafka
```

---

## 🐧 Linux / Shell

### Mover Arquivos

```bash
# Mover múltiplos arquivos de uma vez por padrão
mv *{padrao} destino
```

---

## 📝 Vim

### Substituição de Texto

```vim
# Substituir uma palavra em todo o arquivo
:%s/\<palavra\>/nova/g
```

### Copiar Linha

```vim
yyp
```

| Tecla | Ação |
|-------|------|
| `yy`  | Copia (yank) a linha inteira |
| `p`   | Cola abaixo da linha atual |

---
## 🐳 Kind

```bash
# Carregar imagem local do Docker para dentro do cluster Kind
kind load docker-image {nome_imagem}

# Carregar especificando o cluster
kind load docker-image {nome_imagem} --name {nome_do_cluster}
```

---
## 📨 Kafka

```bash
# Listar/descrever um tópico
./kafka-topics.sh --describe --topic test-topic --bootstrap-server localhost:9092
```
---

## 📜 Kubetail

```bash
# Ver logs em tempo real de um deploy ou service
kubetail logs {namespace}:{especificacao_deploy_svc}/{nome_metadata} -f
```

---
