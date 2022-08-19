# tiny-rabbit

Toy project solving [Zan's 3rd challenge](https://github.com/zanfranceschi/desafio-03-processamento_distribuido/)

### running locally: 

```bash
git clone git@github.com:ddanielsantos/tiny-rabbit.git
cd tiny-rabbit

# your preferred package manager
pnpm install

# generates a new file
pnpm create-raw

# each actor is suposed to be a different application
# run each one of them in a different shell, like

pnpm actor:worker
pnpm actor:collector
pnpm actor:distributor
```

### demo:
![a GIF showing how this project works](./tiny-rabbit-demo.gif)

### todo:
- [ ] setup Dockerfile
- [ ] setup docker.compose
