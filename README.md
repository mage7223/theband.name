# theband.name
An application for submitting and searching band names

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
cd .devcontainer
docker compose -f docker-compose-dev.yml up -d
cd ..
npm install
npm run start:debug
```

### Popuate some bands

navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql)

```graphql
mutation {
  m1: createBand(band: {  name: "Sweet Sweet", authorEmail: "someone@somewhere.com"}){
    id
    name
    author {
      id
      name
      email
    }
  }
  m2: createBand(band: {  name: "Sweet Sweeter", authorEmail: "someone@somewhere.com"}){
    id
    name
    author {
      id
      name
      email
    }
  }
  m3: createBand(band: {  name: "Lamers", authorEmail: "noone@somewhere.com"}){
    id
    name
    author {
      id
      name
      email
    }
  }
}
```

### Query some bands
```graphql
query {
  bands(where: { name: { like: "Sweet%"}}){
    id
    name
    author{
      id
      name
      email
    }
  }
}
```

## References

[TypeORM](https://typeorm.io/) - ORM model used for Entity loading

[NestJS GraphQL Tools](https://github.com/Adrinalin4ik/Nestjs-Graphql-Tools?tab=readme-ov-file#filters)
