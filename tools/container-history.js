import z from "zod";


export const containerHistoryToolName = 'get_container_history';
export const containerHistoryDescription =
    'Use this tool when the user asks about a SPECIFIC container. ' +
    'Examples: defects of a container, inspection status of a container, ' +
    'who inspected a container, history of a container ID, ' +
    'whether a container was accepted or rejected. ' +
    'Requires containerId and a date range.';
export const containerHistoryInputSchema = {
    ContainerId: z.string().describe(
        'The containerId to lokkup like (eg: ALUE123457G124 , CART123457G124)'
    ),
    StartDate: z.string().describe(
        'Start date in YYYY-MM-DD format (eg: 2026-01-24)'
    ),
    EndDate: z.string().describe(
        'End date in YYYY-MM-DD format (eg: 2026-01-28)'
    )
}


export async function containerHistoryHandler({ ContainerId, StartDate, EndDate }) {
    try {
        const result = await fetchcontainerHistory(ContainerId, StartDate, EndDate);

        if (result.length === 0) {
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({ result: [] }, null, 2)
                }]
            };
        }

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({ result: result }, null, 2)
            }]
        }

    } catch (err) {
        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    error: true,
                    message: `Error in fetching ContainerGlobalSet : ${err.message}`
                }, null, 2)
            }]
        }

    }
}