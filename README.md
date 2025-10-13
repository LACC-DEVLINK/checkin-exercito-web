# CheckIn Exército - Sistema Web Admin

Sistema web administrativo desenvolvido em React com TypeScript para gerenciamento do sistema de check-in militar. Interface administrativa para controle de participantes, eventos, relatórios e configurações.

## Funcionalidades

- **Dashboard Administrativo**: Visão geral de estatísticas e métricas
- **Gerenciamento de Participantes**: CRUD completo de participantes
- **Controle de Eventos**: Criação e administração de eventos militares
- **Relatórios Avançados**: Geração de relatórios com gráficos interativos
- **Autenticação**: Sistema de login para administradores
- **Interface Responsiva**: Compatível com desktop, tablet e mobile
- **Tema Moderno**: Interface limpa com Tailwind CSS

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 16.x ou superior)
- **npm** (versão 8.x ou superior) ou **yarn**
- **Git** para clonagem do repositório

### Verificar Instalação

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version
```

### Configuração do Projeto

#### 1. **Clonar o Repositório**

**Opção 1: Usando HTTPS**
```bash
git clone https://github.com/LACC-DEVLINK/checkin-exercito.git
```

**Opção 2: Usando SSH (recomendado se você tem chave SSH configurada)**
```bash
git clone git@github.com:LACC-DEVLINK/checkin-exercito.git
```

#### 2. **Navegar até o Projeto Web**

Após clonar, navegue até a pasta do projeto web:
```bash
cd checkin-exercito/checkin-exercito-web
```

#### 3. **Instalar Dependências**

Execute um dos comandos abaixo para instalar todas as dependências:

**Usando npm:**
```bash
npm install
```

**Usando yarn:**
```bash
yarn install
```

### Executando o Projeto

#### Modo Desenvolvimento

Execute o comando para iniciar o servidor de desenvolvimento:

**Com npm:**
```bash
npm start
```

**Com yarn:**
```bash
yarn start
```

O aplicativo será executado em modo de desenvolvimento e estará disponível em:
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Modo**: Hot reload ativo (recarrega automaticamente ao fazer alterações)

#### Modo Produção (Build)

Para gerar a build de produção:

**Com npm:**
```bash
npm run build
```

**Com yarn:**
```bash
yarn build
```

#### Executar Testes

**Com npm:**
```bash
npm test
```

**Com yarn:**
```bash
yarn test
```