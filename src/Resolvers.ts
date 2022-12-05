import bands from "./dataset";
const Resolvers = {
    Query: {
        getAllBands: () => bands,
        getBand: (_: any, args: any) => {
            return bands.find((band) => band.id === args.id);
        },
       
    },
};

export default Resolvers;