# theband.name
An application for submitting and searching band names

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
cd .devcontainer
docker compose up
cd ..
npm install
npm run start 
```

### Popuate some bands

navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql)

```graphql
mutation AddBand(
  $band0name: String = "Old Band",
  $band1name: String = "New Band",
  $band2name: String = "Jammin") {
  b0: createBand(name:$band0name){
    id
    name
  }
  b1: createBand(name:$band1name){
    id
    name
  }
  b2: createBand(name:$band2name){
    id
    name
  }
}
```

### Query some bands
```graphql
query BandQueries(
  $bandNameEquals: String = "Jammin",
  $bandNameLike: String = "Band"
) {
  q0: bands{
    id
    name
  }
  
  q1: bandByName(name: $bandNameEquals){
    id
    name
  }
  
  q2: bandLikeName(name: $bandNameLike){
    id
    name
  }
}
```

Null return types are not currently respected. The result types should be abstracted to a Null | Band type

## Test ( Currently broken )

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

