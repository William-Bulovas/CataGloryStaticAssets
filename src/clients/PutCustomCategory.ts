import BasicBackendCall from './BasicBackEndCall';

export default function PutCustomCategory(gameId: string, category: string): Promise<void> {
    return BasicBackendCall.call("PUT", "QUESTION/" + gameId,  JSON.stringify({category: category}))
        .then();
};
