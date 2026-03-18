// import { useEffect, useState } from "react";

// export type Agent = {
//   id: string;
//   name: string;
//   avatar: string;
//   is_verified: boolean;
//   rating: string;
//   total_listings: string;
// };

// type UseAgentsOptions = {
//   verifiedOnly?: boolean;
//   minRating?: number;
//   limit?: number;
// };

// export function useAgents(options?: UseAgentsOptions) {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch("/agents.json");

//         if (!response.ok) {
//           throw new Error("Failed to fetch agents");
//         }

//         const data = await response.json();
//         let filteredAgents: Agent[] = data.agents;

//         // ✅ Apply filters if provided
//         if (options) {
//           // Verified filter
//           if (options.verifiedOnly) {
//             filteredAgents = filteredAgents.filter(
//               (agent) => agent.is_verified,
//             );
//           }

//           // Minimum rating filter
//           if (options.minRating !== undefined) {
//             filteredAgents = filteredAgents.filter(
//               (agent) => parseFloat(agent.rating) >= options.minRating!,
//             );
//           }

//           // Limit
//           if (options.limit) {
//             filteredAgents = filteredAgents.slice(0, options.limit);
//           }
//         }

//         setAgents(filteredAgents);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//         setAgents([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, [options?.verifiedOnly, options?.minRating, options?.limit]);

//   return { agents, loading, error };
// }

// export function useAgent(id: string) {
//   const [agent, setAgent] = useState<Agent | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAgent = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch("/agents.json");

//         if (!response.ok) {
//           throw new Error("Failed to fetch agent");
//         }

//         const data = await response.json();

//         const foundAgent = data.agents.find((a: Agent) => a.id === id);

//         if (!foundAgent) {
//           throw new Error("Agent not found");
//         }

//         setAgent(foundAgent);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//         setAgent(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchAgent();
//     }
//   }, [id]);

//   return { agent, loading, error };
// }

import { useState, useEffect } from "react";

// ✅ SIMPLIFIED: Only agent profile data (no property-specific data)
export type Agent = {
  id: string;
  name: string;
  avatar: string;
  is_verified: boolean;
  rating: string;
  total_listings: string;
};

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/agents.json");

        if (!response.ok) {
          throw new Error("Failed to fetch agents");
        }

        const data = await response.json();
        setAgents(data.agents);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, loading, error };
}

export function useAgent(id: string) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await fetch("/agents.json");

        if (!response.ok) {
          throw new Error("Failed to fetch agent");
        }

        const data = await response.json();
        const foundAgent = data.agents.find((a: Agent) => a.id === id);

        if (!foundAgent) {
          throw new Error("Agent not found");
        }

        setAgent(foundAgent);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgent();
    }
  }, [id]);

  return { agent, loading, error };
}

// Helper function to get agent by name (for backward compatibility with properties)
export function useAgentByName(name: string) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await fetch("/agents.json");

        if (!response.ok) {
          throw new Error("Failed to fetch agent");
        }

        const data = await response.json();
        const foundAgent = data.agents.find((a: Agent) => a.name === name);

        if (!foundAgent) {
          throw new Error("Agent not found");
        }

        setAgent(foundAgent);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchAgent();
    }
  }, [name]);

  return { agent, loading, error };
}
