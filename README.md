# Events Manager

Este repositório contém um sistema CRUD completo que permite gerenciar Usuários e Eventos, incluindo um relacionamento N\:N entre eles. A aplicação é composta por um backend em Java usando Spring Boot e um frontend em Angular com integração via API REST.

## Funcionalidades

### Backend (Java com Spring Boot):

- Cadastro, atualização, exclusão e listagem de Usuários.
- Cadastro, atualização, exclusão e listagem de Eventos.
- Gerenciamento do relacionamento N\:N entre Usuários e Eventos.
- Persistência de dados utilizando JPA e Hibernate.
- Validação de entradas para os modelos de Usuário e Evento.
- Persistência de Imagens no servidor:
  - Upload de imagens através de endpoints dedicados no backend.

### Frontend (Angular):

- Interface amigável para gerenciar Usuários e Eventos.
- Formulários para cadastro e edição de Usuários e Eventos.
- Listagem e visualização de Usuários e Eventos cadastrados.
- Vinculação de Usuários a Eventos e vice-versa.
- Consumo da API REST desenvolvida no backend.

## Tecnologias Utilizadas

### Backend:

- **Java** (JDK 17+)

- **Spring Boot**

  - Spring Web
  - Spring Data JPA
  - Hibernate

- **Banco de Dados:** MySQL

### Frontend:

- **Angular** (v15+)
- **PrimeNG** (Componentes de UI)
- **Angular Material** (opcional)

## Pré-requisitos

- **Backend:**

  - JDK 17 ou superior.
  - Maven 3.6+.
  - MySQL Server (ou outro banco de dados relacional).

- **Frontend:**

  - Node.js (v16+).
  - Angular CLI (v15+).

## Configuração do Ambiente

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/brunobusarello/Events-Manager.git
   ```
2. Navegue até o diretório do backend:
   ```bash
   cd Spring
   ```
3. Configure o arquivo `application.properties` com as credenciais do banco de dados:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/nome_do_banco
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd Angular/project
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
4. Acesse a aplicação no navegador:
   ```
   http://localhost:4200
   ```

## Estrutura do Projeto

### Backend:

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com.example.crud/
│   │   │   │   ├── config/       # Configurações da aplicação
│   │   │   │   ├── controller/   # Controladores REST
│   │   │   │   ├── dto/          # Objetos de transferência de dados
│   │   │   │   ├── exception/    # Tratamento de exceções
│   │   │   │   ├── model/        # Modelos de dados
│   │   │   │   ├── repository/   # Repositórios JPA
│   │   │   │   └── service/      # Lógica de negócio
│   │   └── resources/
│   │       └── application.properties
├── pom.xml
```

### Frontend:

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/    # Componentes Angular
│   │   │   ├── modules/   # Módulos do sistema (usuários, eventos, dashboard, etc.)
│   │   ├── guards/        # Guards para rotas
│   │   ├── interfaces/    # Interfaces para os dados
│   │   ├── services/      # Serviços Angular para consumir a API
│   │   └── shared/        # Recursos compartilhados (diretivas, pipes, etc.)
├── angular.json
├── package.json
```

