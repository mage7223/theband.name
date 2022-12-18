import {ReactElement, FC} from "react";
import { QueryEditor,GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';


const fetcher = createGraphiQLFetcher({
    url: 'https://localhost:3000/graphql',
  });

const GraphiQL: FC<any> = (): ReactElement => {
    return (
        <GraphiQLProvider fetcher={fetcher}>
        <div className="graphiql-container">
          <QueryEditor />
        </div>
      </GraphiQLProvider>
    );
};

export default GraphiQL;